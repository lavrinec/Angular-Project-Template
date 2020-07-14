import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from '@app/other/contacts/contacts.component';



@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule
  ],
  exports: [ContactsComponent]
})
export class ContactsModule { }
