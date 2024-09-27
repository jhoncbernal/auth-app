import type {
  ICredential,
  IVerification,
  IValidateToken,
  IUserForm,
  IUpdateUserData,
} from "@/backend/auth/v1/models/schema.model";
import type { User } from "@/backend/shared/models/prisma.model";

export interface IService {
  getUserByCredentials(params: ICredential): Promise<User>;
  sendVerificationRequest(params: IVerification): Promise<void>;
  validateUrlToken(params: IValidateToken): Promise<string>;
  createUserByForm(params: IUserForm): Promise<Partial<User>>;
  generateToken(params: any): Promise<any>;
  updateUserData(params: IUpdateUserData): Promise<any | never>;
}
