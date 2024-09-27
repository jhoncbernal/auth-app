import { inject, injectable } from "inversify";
import { TYPES as SHARED_TYPES } from "@/backend/shared/d-injection/types";
import { IDatabase } from "@/backend/shared/interfaces/database.interface";
import { PrismaClient, Prisma } from "@/backend/shared/models/prisma.model";
import type { ILogger } from "@/backend/shared/interfaces/logger.interface";

@injectable()
export class PrismaDatabase<T extends PrismaClient> implements IDatabase<T> {
  public readonly adapter: T &
    PrismaClient<Prisma.PrismaClientOptions, "info" | "warn" | "error">;

  constructor(@inject(SHARED_TYPES.Logger) private readonly logger: ILogger) {
    this.adapter = new PrismaClient({
      log: [
        { level: "warn", emit: "event" },
        { level: "info", emit: "event" },
        { level: "error", emit: "event" },
      ],
    }) as T;

    this.adapter.$on("info", (info) => {
      this.logger.info("[Prisma][Info]", info);
    });

    this.adapter.$on("warn", (warn) => {
      this.logger.warn("[Prisma][Warn]", warn);
    });

    this.adapter.$on("error", (error) => {
      this.logger.error("[Prisma][Error]", error);
    });
  }

  public async connect() {
    try {
      await this.adapter.$connect();
      this.logger.info("[Prisma][Status]", "Connected to database");
    } catch (error) {
      this.logger.info("[Prisma][Status]", error);
    }
  }

  public async disconnect() {
    await this.adapter.$disconnect();
    this.logger.info("[Prisma][Status]", "Disconnected from database");
  }
}
