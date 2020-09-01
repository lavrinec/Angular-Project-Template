import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/components/home/home.component';
import { ContatcsComponent } from '@src/app/components/contatcs/contatcs.component';
import { SettingsComponent } from '@src/app/components/settings/settings.component';
import { LoginComponent } from '@src/app/components/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BaseUrlInterceptor } from '@src/app/core/interceptors/base-url.interceptor';
import { HeaderInterceptor } from '@src/app/core/interceptors/header.interceptor';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from '@src/app/core/interceptors/token.interceptor';
import { GridModule } from '@syncfusion/ej2-angular-grids';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContatcsComponent,
    SettingsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GridModule
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
