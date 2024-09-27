import { injectable } from "inversify";
import { z } from "zod";
import { IResponse } from "@/backend/shared/models/context.model";
import type { ILogger } from "@/backend/shared/interfaces/logger.interface";
import { IController } from "@/backend/shared/interfaces/controller.interface";

@injectable()
export class Controller implements IController {
  module: string = "";
  params: object | any;
  session: object | any;

  constructor(private readonly logger: ILogger) {
    this.logger = logger;
  }
  /**
   * Return response
   * @param data
   * @returns {IResponse}
   */
  public response<T>(data: T): IResponse {
    this.logger.success(this.module, {
      request: this.params,
      response: "ok",
    });

    return {
      status: true,
      data,
      error: null,
    };
  }

  /**
   * Return error
   * @param error
   * @returns {IResponse}
   */
  public error(error: Error | string | any): IResponse {
    this.logger.error(this.module, {
      request: this.params,
      response: error,
    });

    return {
      status: false,
      data: null,
      error: error?.message || (error?.[0]?.message && error[0]) || error,
    };
  }

  /**
   * Validate params with schema
   * @param params
   * @param schema
   * @returns {Promise<void, throw>}
   */
  public async validate<P, S>(params: P, schema: z.ZodSchema<S>) {
    // Validate schema
    const result = await schema.safeParseAsync(params);

    // Throw error if schema is not valid
    if (!result.success) throw result.error.issues;

    // Return data if schema is valid
    return result?.data;
  }
}
