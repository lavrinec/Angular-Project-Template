import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ContactsComponent } from '@src/app/other/contacts/contacts.component';



@NgModule({
  declarations: [ContactsComponent],
  imports: [
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ContactsModuleTns { }
