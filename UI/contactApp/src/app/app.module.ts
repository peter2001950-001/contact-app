import { MessageService } from 'primeng/api';
import { ContactEffects } from './app-state/effects/contact.effects';
import { CoreModule } from './services/core.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './http-interceptors';
import { ENVIRONMENT } from './services/shared';
import {ToastModule} from 'primeng/toast';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './app-state';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ToastModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([ContactEffects])
  ],
  providers: [httpInterceptorProviders,
    { provide: ENVIRONMENT, useValue: environment }],
  bootstrap: [AppComponent]
})
export class AppModule { }
