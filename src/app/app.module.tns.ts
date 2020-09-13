import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/components/home/home.component';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { ContatcsComponent } from '@src/app/components/contatcs/contatcs.component';
import { SettingsComponent } from '@src/app/components/settings/settings.component';
import { LoginComponent } from '@src/app/components/login/login.component';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import { HideActionBarDirectiveTnsDirective } from '@src/app/core/services/utils/hide-action-bar.directive';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from '@src/app/core/interceptors/base-url.interceptor';
import { HeaderInterceptor } from '@src/app/core/interceptors/header.interceptor';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { TokenInterceptor } from '@src/app/core/interceptors/token.interceptor';
import { ContactsDetailComponent } from '@src/app/components/contatcs/contacts.detail/contacts.detail.component';
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';
import { RemindersComponent } from '@src/app/components/reminders/reminders.component';
import { NativeScriptUIAutoCompleteTextViewModule } from 'nativescript-ui-autocomplete/angular';
import { NativeScriptUICalendarModule } from 'nativescript-ui-calendar/angular';
import { ActivityDetailComponent } from '@src/app/components/home/activity.detail/activity.detail.component';
import { ActivityDetailEditComponent } from '@src/app/components/home/activity.detail.edit/activity.detail.edit.component';
import { ContacsDetailEditComponent } from '@src/app/components/contatcs/contacs.detail.edit/contacs.detail.edit.component';

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
    HideActionBarDirectiveTnsDirective,
    ContactsDetailComponent,
    RemindersComponent,
    ActivityDetailComponent,
    ActivityDetailEditComponent,
    ContacsDetailEditComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptCommonModule,
    NativeScriptUISideDrawerModule,
    NativeScriptUIListViewModule,
    NativeScriptUIDataFormModule,
    NativeScriptUICalendarModule,
    NativeScriptHttpClientModule,
    NativeScriptFormsModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
