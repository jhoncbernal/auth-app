import { ISession } from "@/backend/shared/models/auth.model";

export interface IRequest {
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
  cookies?: any;
  path?: string;
  session?: ISession;
}

export interface IResponse {
  status: boolean;
  data: string | null | any;
  error: string | null | any;
}
