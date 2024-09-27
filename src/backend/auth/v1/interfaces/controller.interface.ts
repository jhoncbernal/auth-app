import type {
  IRequest,
  IResponse,
} from "@/backend/shared/models/context.model";

export interface IController {
  getUserByCredentials(request: IRequest): Promise<IResponse>;
  sendVerificationRequest(request: IRequest): Promise<IResponse>;
  validateUrlToken(request: IRequest): Promise<IResponse>;
  createUserByForm(request: IRequest): Promise<IResponse>;
  generateToken(request: IRequest): Promise<IResponse>;
  updateUserData(request: IRequest): Promise<IResponse>;
}
