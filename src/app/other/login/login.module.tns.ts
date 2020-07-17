import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { LoginComponent } from '@src/app/other/login/login.component';
import {NativeScriptFormsModule} from '@nativescript/angular';
import { NativeScriptHttpClientModule } from '@nativescript/angular';
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
