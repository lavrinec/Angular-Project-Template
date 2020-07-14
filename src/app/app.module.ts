import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/other/home/home.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CoreModule } from '@src/app/core/core.module';
import { ComponentsModule } from '@src/app/shared/components/components.module';
import { PipesModule } from '@src/app/shared/pipes/pipes.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@src/environments/environment';
import { LoginModule } from '@src/app/other/login/login.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderInterceptor} from '@src/app/core/interceptors/header.interceptor';
import {BaseUrlInterceptor} from '@src/app/core/interceptors/base-url.interceptor';
import {ContactsModule} from '@src/app/other/contacts/contacts.module';
import { DashboardComponent } from '@app/other/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    ComponentsModule,
    PipesModule,
    TranslateModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LoginModule,
    // testing
    ContactsModule
  ],
  providers: [
    TranslateService,
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
