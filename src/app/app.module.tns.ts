import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { ContatcsComponent } from '@src/app/contatcs/contatcs.component';
import { SettingsComponent } from '@src/app/settings/settings.component';
import { LoginComponent } from '@src/app/login/login.component';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import { HideActionBarDirectiveTns } from '@src/app/core/services/utils/hide-action-bar.directive';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from '@src/app/core/interceptors/base-url.interceptor';
import { HeaderInterceptor } from '@src/app/core/interceptors/header.interceptor';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContatcsComponent,
    SettingsComponent,
    LoginComponent,
    HideActionBarDirectiveTns
  ],
  imports: [
    NativeScriptModule,
    NativeScriptCommonModule,
    NativeScriptUISideDrawerModule,
    NativeScriptHttpClientModule,
    NativeScriptFormsModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
