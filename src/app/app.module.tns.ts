import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ComponentsModuleTns } from '@shared/components/components.module.tns';
import { CoreModuleTns } from '@core/core.module.tns';
import { PipesModuleTns } from '@shared/pipes/pipes.module.tns';
import {LoginModuleTns} from '@src/app/login/login.module';
import { ContactsModuleTns } from './contacts/contacts.module.tns';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BaseUrlInterceptor} from '@core/interceptors/base-url.interceptor';
import {HeaderInterceptor} from '@core/interceptors/header.interceptor';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    CoreModuleTns,
    ComponentsModuleTns,
    PipesModuleTns,
    TranslateModule.forRoot(),
    NativeScriptHttpClientModule,
    LoginModuleTns,
    // testing
    ContactsModuleTns
  ],
  providers: [
    TranslateService,
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
