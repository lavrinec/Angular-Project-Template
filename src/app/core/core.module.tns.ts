import { NgModule } from '@angular/core';
import { Helper } from '@core/services/utils/helper.tns';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

@NgModule({
  declarations: [],
  providers: [
    Helper
  ],
  imports: [
    NativeScriptUISideDrawerModule
  ],
})
export class CoreModuleTns {}
