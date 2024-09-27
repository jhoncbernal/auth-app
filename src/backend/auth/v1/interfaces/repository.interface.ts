import type {
  ICredential,
  IUserForm,
  IGenerateToken,
  IValidateToken,
  IUpdateUserData,
} from "@/backend/auth/v1/models/schema.model";
import type { User, ApiKey } from "@/backend/shared/models/prisma.model";

export interface IRepository {
  createUserByForm(params: IUserForm): Promise<Partial<User>>;
  getUserByEmail(params: ICredential): Promise<User>;
  createVerificationToken(params: {
    identifier: string;
    token: string;
    expires: Date;
  }): Promise<string | never>;
  getVerificationToken(params: { identifier: string }): Promise<any | never>;
  validateUrlToken(params: IValidateToken): Promise<string | never>;
  getApiKeyByCredentials(params: IGenerateToken): Promise<ApiKey | null>;
  updateUserData(params: IUpdateUserData): Promise<any>;
}
