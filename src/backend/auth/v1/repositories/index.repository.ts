// D-injection
import { inject, injectable } from "inversify";
import { TYPES as SHARED_TYPES } from "@/backend/shared/d-injection/types";
// Interfaces
import type { IRepository } from "@/backend/auth/v1/interfaces/repository.interface";
import type { IDatabase } from "@/backend/shared/interfaces/database.interface";
import type { ILogger } from "@/backend/shared/interfaces/logger.interface";
import type {
  ICredential,
  IUserForm,
  IGenerateToken,
  IValidateToken,
  IUpdateUserData,
} from "@/backend/auth/v1/models/schema.model";
// Models
import type { PrismaClient, User } from "@/backend/shared/models/prisma.model";

@injectable()
export class IndexRepository implements IRepository {
  constructor(
    @inject(SHARED_TYPES.Database)
    private readonly database: IDatabase<PrismaClient>,
    @inject(SHARED_TYPES.Logger) private readonly logger: ILogger,
  ) {}

  async createUserByForm(params: IUserForm) {

    const query = await this.database.adapter.user
      .create({
        data: {
          email: params.email,
          name: params.name,
          phone: params.phone,
          hashedPassword: params.password,
          emailVerified: params.type === "form" ? null : new Date(),
        },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          createdAt: true,
        },
      })
      .catch((error) => {
        this.logger.error(error);

        if (error.toString().includes("User_email_key"))
          throw "El email ya está registrado.";

        throw "Error creando usuario.";
      });

    return query;
  }

  async getUserByEmail(params: ICredential) {
    const query = await this.database.adapter.user
      .findUnique({
        where: {
          email: params.email,
        },
      })
      .catch((error: any) => {
        this.logger.error(error);
        throw "Error obteniendo usuario por email.";
      });

    return query as User;
  }

  async createVerificationToken(params: {
    identifier: string;
    token: string;
    expires: Date;
  }) {
    const query = await this.database.adapter.verificationToken
      .create({
        data: {
          identifier: params.identifier,
          token: params.token,
          expires: params.expires,
        },
      })
      .catch((error: any) => {
        this.logger.error(error);
        throw "Error creando token de verificación.";
      });

    return query.token;
  }

  async getVerificationToken(params: { identifier: string }) {
    const query = await this.database.adapter.verificationToken
      .findFirst({
        where: {
          identifier: params.identifier,
        },
        orderBy: {
          expires: "desc",
        },
      })
      .catch((error: any) => {
        this.logger.error(error);
        throw "Error obteniendo token de verificación.";
      });

    return query;
  }

  async validateUrlToken(params: IValidateToken) {
    const query = await this.database.adapter.verificationToken
      .findUnique({
        where: {
          token: params.token,
        },
      })
      .catch((error: any) => {
        this.logger.error(error);
        throw "Error validando token de verificación.";
      });

    if (!query) throw "Token inválido.";

    if (query.expires < new Date()) throw "Token expirado.";

    // Update emailVerified field in user
    await this.database.adapter.user
      .update({
        where: {
          email: query.identifier,
        },
        data: {
          emailVerified: new Date(),
        },
      })
      .catch((error: any) => {
        this.logger.error(error);
        throw "Error actualizando la verificación de email.";
      });

    // Delete verification token
    this.database.adapter.verificationToken
      .delete({
        where: {
          token: params.token,
        },
      })
      .catch((error: any) => {
        this.logger.error(error);
      });

    return query.identifier;
  }

  async getApiKeyByCredentials(params: IGenerateToken) {
    const query = await this.database.adapter.apiKey
      .findUnique({
        where: {
          clientId: params.clientId,
          clientSecret: params.clientSecret,
        },
      })
      .catch((error: any) => {
        this.logger.error(error);
        throw "Error while fetching API key by credentials.";
      });

    return query;
  }

  async updateUserData(params: IUpdateUserData) {
    const query = await this.database.adapter.user
      .update({
        where: {
          id: params.userId,
        },
        data: {
          ...(params.email && { email: params.email }),
          ...(params.name && { name: params.name }),
          ...(params.phone && { phone: params.phone }),
          ...(params.image && { image: params.image }),
        },
      })
      .catch((error: any) => {
        this.logger.error(error);
        throw `Error updating user data: ${error}`;
      });

    return query.updatedAt;
  }
}
