import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { appBootstrap } from './app-bootstrap';
import { AppConfigService } from './app-config.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [AppConfigService, appBootstrap]
})
export class CoreModule {}
