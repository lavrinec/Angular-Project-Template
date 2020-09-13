import {LOCALE_ID, NgModule} from '@angular/core';
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
import { ContactsDetailComponent } from '@src/app/components/contatcs/contacts.detail/contacts.detail.component';
import {TextBoxModule} from '@syncfusion/ej2-angular-inputs';
import {RemindersComponent, IsReminderDue, SortReminders} from '@src/app/components/reminders/reminders.component';
import {ScheduleModule} from '@syncfusion/ej2-angular-schedule';
import {loadCldr, setCulture, setCurrencyCode} from '@syncfusion/ej2-base';
import { registerLocaleData } from '@angular/common';
import localeSl from '@angular/common/locales/sl';
import * as moment from 'moment';
import { ActivityDetailComponent } from '@src/app/components/home/activity.detail/activity.detail.component';
moment.locale('sl');

registerLocaleData(localeSl, 'sl');

declare const require: any;

loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/sl/ca-gregorian.json'),
    require('cldr-data/main/sl/numbers.json'),
    require('cldr-data/main/sl/timeZoneNames.json'),
    require('cldr-data/supplemental/weekdata.json')
);
setCulture('sl');
setCurrencyCode('EUR');


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContatcsComponent,
    SettingsComponent,
    LoginComponent,
    ContactsDetailComponent,
    RemindersComponent,
    IsReminderDue,
    SortReminders,
    ActivityDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GridModule,
    TextBoxModule,
    ScheduleModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'sl'},
    {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  exports: [
    SortReminders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
