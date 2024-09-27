import { z } from "zod";
import { IResponse } from "@/backend/shared/models/context.model";

export interface IController {
  module: string;
  params: object | any;
  session: object | any;
  response<T>(data: T): IResponse;
  error(error: Error | string | any): IResponse;
  validate<P, S>(params: P, schema: z.ZodSchema<S>): Promise<S>;
}
