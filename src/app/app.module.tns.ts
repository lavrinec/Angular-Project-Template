import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { ContatcsComponent } from '@src/app/contatcs/contatcs.component';
import { SettingsComponent } from '@src/app/settings/settings.component';
import { LoginComponent } from '@src/app/login/login.component';


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
  ],
  imports: [
    NativeScriptModule,
    NativeScriptUISideDrawerModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
