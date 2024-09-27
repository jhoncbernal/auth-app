import "reflect-metadata";
// Entities
import { IndexController } from "@/backend/auth/v1/controllers/index.controller";
import { IndexService } from "@/backend/auth/v1/services/index.service";
import { IndexRepository } from "@/backend/auth/v1/repositories/index.repository";
// Interfaces
import type { IController } from "@/backend/auth/v1/interfaces/controller.interface";
import type { IService } from "@/backend/auth/v1/interfaces/service.interface";
import type { IRepository } from "@/backend/auth/v1/interfaces/repository.interface";
// D-injection
import { ContainerModule, interfaces } from "inversify";
import { AppContainer } from "@/backend/shared/d-injection/container";
import { TYPES } from "@/backend/auth/v1/d-injection/types";
import { commonModule } from "@/backend/shared/d-injection/config";

export const containerModule = new ContainerModule((bind: interfaces.Bind) => {
  // Controllers
  bind<IController>(TYPES.AuthController)
    .to(IndexController)
    .inSingletonScope();

  // Services
  bind<IService>(TYPES.AuthService).to(IndexService).inSingletonScope();

  // Repositories
  bind<IRepository>(TYPES.AuthRepository)
    .to(IndexRepository)
    .inSingletonScope();

  // Integrations (Tagged inject)
});

AppContainer.unload(commonModule, containerModule);
AppContainer.load(commonModule, containerModule);

export const controller = AppContainer.get<IController>(TYPES.AuthController);
