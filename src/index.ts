import { createContainer } from './interface/container';
import { env } from './util/env';
import { Logger } from './util/logger';

interface AppConfig {
  http?: boolean
}

export class App {
  private readonly _http?: boolean;

  constructor ({ http }: AppConfig) {
    this._http = http;
  }

  run () {
    const interfaceContainer = createContainer({
      env,
      init: {
        http: this._http
      }
    });

    if (this._http) {
      interfaceContainer.httpInterface?.serve();
    }
  }
}

const logger = new Logger(App.name);

const app = new App({
  http: env.httpActive
});

setImmediate(() => {
  app.run();
  logger.console().info('App initialized');
});
