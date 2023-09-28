import { type IHttpInterface } from '../types/interface';
import { createContainer as createInfraContainer } from '../infrastructure/container';
import { createContainer as createCoreContainer } from '../core/container';
import { HttpInterface } from './http';

interface ContainerConfig {
  env: typeof import('../util/env').env
  init: {
    http?: boolean
  }
}

interface Container {
  httpInterface?: IHttpInterface
}

export function createContainer (config: ContainerConfig): Container {
  const container: Container = {};

  const infraContainer = createInfraContainer();

  const coreContainer = createCoreContainer(infraContainer);

  if (config.init.http) {
    container.httpInterface = new HttpInterface({
      env: config.env,
      coreContainer
    });
  }

  return container;
}
