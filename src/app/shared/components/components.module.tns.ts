import { NgModule } from '@angular/core';
import { MobileMenuComponent } from '@src/app/shared/components/mobile-menu/mobile-menu.component';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { Helper } from '@core/services/utils/helper.tns';
import { NativeScriptModule } from '@nativescript/angular';

@NgModule({
  declarations: [
    MobileMenuComponent
  ],
  imports: [
    NativeScriptModule,
    //NativeScriptUISideDrawerModule
  ],
 exports: [MobileMenuComponent]
})
export class ComponentsModuleTns { }
