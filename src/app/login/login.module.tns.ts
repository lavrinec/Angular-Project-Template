import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { LoginComponent } from '@src/app/login/login.component';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import {AppRoutingModule} from '@app/app-routing.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    AppRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [LoginComponent]
})
export class LoginModuleTns { }
