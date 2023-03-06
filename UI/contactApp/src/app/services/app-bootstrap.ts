import { APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from './app-config.service';

export const appBootstrap = {
  provide: APP_INITIALIZER,
  useFactory: (appConfigService: AppConfigService) => () => {
    return appConfigService.loadAppConfig();
  },
  deps: [AppConfigService],
  multi: true
};
