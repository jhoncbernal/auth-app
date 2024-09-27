import "reflect-metadata";
// Entities
import { WinstonLogger } from "@/backend/shared/integrations/loggers/winston";
import { PrismaDatabase } from "@/backend/shared/integrations/databases/prisma";
import { SendGrid } from "@/backend/shared/integrations/emails/sendgrid";
import { Jsonwebtoken } from "@/backend/shared/integrations/jwt/jsonwebtoken";
// Interfaces
import type { ILogger } from "@/backend/shared/interfaces/logger.interface";
import type { IDatabase } from "@/backend/shared/interfaces/database.interface";
import type { IEmail } from "@/backend/shared/interfaces/email.interface";
import type { IJwt } from "@/backend/shared/interfaces/jwt.interface";
// Models
import { PrismaClient } from "@/backend/shared/models/prisma.model";
// D-injection
import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@/backend/shared/d-injection/types";

export const commonModule = new ContainerModule((bind: interfaces.Bind) => {
  //  Loggers
  bind<ILogger>(TYPES.Logger).to(WinstonLogger).inSingletonScope();

  //  Databases
  bind<IDatabase<PrismaClient>>(TYPES.Database)
    .to(PrismaDatabase)
    .inSingletonScope();

  // Integrations

  // Emails
  bind<IEmail>(TYPES.EmailIntegration)
    .to(SendGrid)
    .inSingletonScope()
    .whenTargetNamed("SendGrid");

  //  JWT
  bind<IJwt>(TYPES.JwtIntegration)
    .to(Jsonwebtoken)
    .inSingletonScope()
    .whenTargetNamed("Jsonwebtoken");

});
