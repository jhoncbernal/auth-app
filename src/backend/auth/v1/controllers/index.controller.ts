// D-injection
import { inject, injectable } from "inversify";
import { TYPES } from "@/backend/auth/v1/d-injection/types";
// Implementations
import { Controller } from "@/backend/shared/controller/base.controller";
// Interfaces
import type { IController } from "@/backend/auth/v1/interfaces/controller.interface";
import type { IService } from "@/backend/auth/v1/interfaces/service.interface";
import type { IRequest } from "@/backend/shared/models/context.model";
import {
  Credential,
  Verification,
  ValidateToken,
  UserForm,
  GenerateToken,
  UpdateUserData,
  type ICredential,
  type IVerification,
  type IValidateToken,
  type IUserForm,
  type IGenerateToken,
  type IUpdateUserData,
} from "@/backend/auth/v1/models/schema.model";
// Logger
import type { ILogger } from "@/backend/shared/interfaces/logger.interface";
import { TYPES as SHARED_TYPES } from "@/backend/shared/d-injection/types";

@injectable()
export class IndexController extends Controller implements IController {
  constructor(
    @inject(TYPES.AuthService) private readonly service: IService,
    @inject(SHARED_TYPES.Logger) logger: ILogger,
  ) {
    super(logger);
  }

  async getUserByCredentials(request: IRequest) {
    try {
      this.module = "[Auth][Login]";

      const { email, password } = request.body as ICredential;

      this.params = await this.validate({ email, password }, Credential);

      const response = await this.service.getUserByCredentials(this.params);

      return this.response(response);
    } catch (error) {
      delete this.params.password;
      return this.error(error);
    }
  }

  async sendVerificationRequest(request: IRequest) {
    try {
      this.module = "[Auth][Verification]";

      const source = request.params?.source as IVerification["source"];

      const email: IVerification["email"] =
        source === "register"
          ? request.body?.email
          : request.session?.user?.email;

      const { url, type } = request.body as IVerification;

      this.params = await this.validate(
        { email, url, type, source },
        Verification,
      );

      const response = await this.service.sendVerificationRequest(this.params);

      return this.response(response);
    } catch (error) {
      return this.error(error);
    }
  }

  async validateUrlToken(request: IRequest) {
    try {
      this.module = "[Auth][ValidateToken]";

      const { token, redirect } = request.query as IValidateToken;

      this.params = await this.validate({ token, redirect }, ValidateToken);

      const response = await this.service.validateUrlToken(this.params);

      return this.response(response);
    } catch (error) {
      return this.error(error);
    }
  }

  async createUserByForm(request: IRequest) {
    try {
      this.module = "[Auth][Register]";

      const { email, name, phone, image, password, type } =
        request.body as IUserForm;

      this.params = await this.validate(
        { email, name, phone, image, password, type },
        UserForm,
      );

      const response = await this.service.createUserByForm(this.params);

      return this.response(response);
    } catch (error) {
      // Remove password from logs
      delete this.params.password;
      return this.error(error);
    }
  }

  async generateToken(request: IRequest) {
    try {
      this.module = "[Auth][GenerateToken]";

      const { clientId, clientSecret } = request.body as IGenerateToken;

      this.params = await this.validate(
        { clientId, clientSecret },
        GenerateToken,
      );

      const response = await this.service.generateToken(this.params);

      return this.response(response);
    } catch (error) {
      return this.error(error);
    }
  }

  async updateUserData(request: IRequest) {
    try {
      this.module = "[Auth][UpdateUserData]";

      const userId = request.session?.user?.id as string;

      const { email, image, name, phone } = request.body as IUpdateUserData;

      this.params = await this.validate(
        { userId, email, image, name, phone },
        UpdateUserData,
      );

      const response = await this.service.updateUserData(this.params);

      return this.response(response);
    } catch (error) {
      return this.error(error);
    }
  }
}
