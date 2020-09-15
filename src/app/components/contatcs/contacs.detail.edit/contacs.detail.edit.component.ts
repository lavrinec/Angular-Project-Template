import { Component, OnInit } from '@angular/core';
import { ContactDTO } from '@src/app/components/Classes/ContactDTO';
import { Contact } from '@src/app/components/Classes/Contact';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { ContactsService } from '@src/app/core/services/api/contacts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacs.detail.edit',
  templateUrl: './contacs.detail.edit.component.html',
  styleUrls: ['./contacs.detail.edit.component.scss']
})
export class ContacsDetailEditComponent implements OnInit {


  contactDTO: ContactDTO;
  contact: Contact = new Contact();

  constructor(
    public helper: HelperService,
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['contactId']) {
        this.contactsService.getContact(Number(params['contactId'])).subscribe((contact: Contact) => {
          this.contact = contact;
          this.contactDTO = new ContactDTO();
          this.contactDTO.id = contact.id;

          if (!contact.firstName) {
            this.contactDTO.firstName = '';
          } else {
          this.contactDTO.firstName = contact.firstName;
          }

          if (!contact.lastName) {
          this.contactDTO.lastName = '';
          } else {
            this.contactDTO.lastName = contact.lastName;
          }

          if (!contact.function) {
            this.contactDTO.function = '';
          } else {
            this.contactDTO.function = contact.function;
          }

          if (!contact.mobileNumber) {
            this.contactDTO.mobileNumber = '';
          } else {
            this.contactDTO.mobileNumber = contact.mobileNumber;
          }

          if (!contact.businessNumber) {
            this.contactDTO.businessNumber = '';
          } else {
            this.contactDTO.businessNumber = contact.businessNumber;
          }

          if (!contact.businessAddress) {
            this.contactDTO.businessAddress = '';
          } else {
            this.contactDTO.businessAddress = contact.businessAddress;
          }

          if (!contact.email1) {
            this.contactDTO.email1 = '';
          } else {
            this.contactDTO.email1 = contact.email1;
          }

          console.log('aaa get contact', this.contactDTO);
        });
      }
    });
  }

  ngOnInit() {

  }

  goBack(): void {
    this.helper.goBack();
  }
  save() {
    console.log('aaaaaaaaa edited contact', this.contactDTO);
  }
}
