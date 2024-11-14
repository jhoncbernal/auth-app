// D-injection
import { inject, injectable, named } from "inversify";
import { hash, compare } from "bcrypt";
import { v4 } from "uuid";
import { PROJECT, SENDGRID } from "@/backend/shared/config";
import { TYPES } from "@/backend/auth/v1/d-injection/types";
import { TYPES as COMMON_TYPES } from "@/backend/shared/d-injection/types";
// Interfaces
import type { IService } from "@/backend/auth/v1/interfaces/service.interface";
import type { IRepository } from "@/backend/auth/v1/interfaces/repository.interface";
import type {
  ICredential,
  IVerification,
  IValidateToken,
  IUserForm,
  IGenerateToken,
  IUpdateUserData,
} from "@/backend/auth/v1/models/schema.model";
import type { IEmail } from "@/backend/shared/interfaces/email.interface";
import type { IJwt } from "@/backend/shared/interfaces/jwt.interface";

@injectable()
export class IndexService implements IService {
  constructor(
    @inject(TYPES.AuthRepository) private readonly repository: IRepository,
    // Email
    @inject(COMMON_TYPES.EmailIntegration)
    @named("SendGrid")
    private readonly sendGridIntegration: IEmail,
    // JWT
    @inject(COMMON_TYPES.JwtIntegration)
    @named("Jsonwebtoken")
    private readonly jwtIntegration: IJwt,
  ) {}

  async getUserByCredentials(params: ICredential) {
    const user = await this.repository.getUserByEmail(params);

    if (!user || !user.hashedPassword)
      throw { message: "Email or password is incorrect." };

    const isCorrectPassword = await compare(
      params.password,
      user.hashedPassword
    );

    if (!isCorrectPassword)
      throw { message: "Email or password is incorrect." };

    return user;
  }

  async sendVerificationRequest(params: IVerification) {
    const templateDictionary = {
      verifyEmail: {
        title: "Auth - Confirm email",
        template: SENDGRID.TEMPLATES.WELCOME.ID,
        path: "/api/auth/email/verify",
      },
      recoverPassword: {
        title: "Auth - Recover Password",
        template: "d-dd78ae8503e049eca75039138819552a",
        path: "/api/auth/email/recover",
      },
    };

    const template = templateDictionary[params.type];

    const token = await this.repository.createVerificationToken({
      identifier: params.email,
      token: v4(),
      // expires im 1 hours
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });

    const url = `${PROJECT.host}${
      template.path
    }?token=${token}&redirect=${encodeURIComponent(params.url)}`;

    const body = {
      source: SENDGRID.EMAIL_SENDER,
      destination: params.email,
      title: template.title,
      template: {
        name: template.template,
        version: "1",
      },
      data: {
        url,
      },
    };

    await this.sendGridIntegration.sendEmail(body);
  }

  async validateUrlToken(params: IValidateToken) {
    await this.repository.validateUrlToken(params);

    return `${PROJECT.host}${params.redirect}`;
  }

  async createUserByForm(params: IUserForm) {
    try {
      const data = await this.repository.createUserByForm({
        ...params,
        password: await hash(params.password, 10),
      });

      return data;
    } catch (error) {
      throw {
        message: error,
      };
    }
  }

  async generateToken(params: IGenerateToken) {
    // Validate client in database
    const apiKey = await this.repository.getApiKeyByCredentials(params);
    if (!apiKey) throw { message: "Invalid client credentials." };
    // Sign token
    const token = await this.jwtIntegration.sign({
      userId: apiKey.id,
      permissions: apiKey.permissions,
    });
    return { token };
  }

  async updateUserData(params: IUpdateUserData) {
    return await this.repository.updateUserData(params);
  }
}
