import { Component, OnInit } from '@angular/core';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { ContactsService } from '@src/app/core/services/api/contacts.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '@src/app/components/Classes/Contact';
import { ContactDTO } from '@src/app/components/Classes/ContactDTO';


@Component({
  selector: 'app-contacts.detail',
  templateUrl: './contacts.detail.component.html',
  styleUrls: ['./contacts.detail.component.scss']
})
export class ContactsDetailComponent implements OnInit {

  contactDTO: ContactDTO;
  contact: Contact = new Contact();
  predpona = ['', 'družina', 'g.'];
  pripona = ['', 'dipl.', 'dipl. inž.'];

  constructor(
    private helper: HelperService,
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['contactId']) {
        this.contactsService.getContact(Number(params['contactId'])).subscribe((contact: Contact) => {
          this.contact = contact;
          this.contactDTO = new ContactDTO();
          // Object.keys(this.contactDTO).forEach(key => {
          //   this.contactDTO[key] = contact[key];
          // });
          this.contactDTO.id = contact.id;
          this.contactDTO.firstName = contact.firstName;
          this.contactDTO.lastName = contact.lastName;
          this.contactDTO.prefix = contact.prefix;
          if (contact.suffix) {
            this.contactDTO.suffix = contact.suffix;
          } else {
            this.contactDTO.suffix = '';
          }

          this.contactDTO.isActive = contact.isActive;
          this.contactDTO.birthday = contact.birthday;


           console.log('aaa get contact', this.contactDTO);
        });
      }
    });
  }

  ngOnInit() {

  }

  onDrawerButtonTap(): void {
    this.helper.onDrawerButtonTap();
  }
  goBack(): void {
    this.helper.goBack();
  }
  logProperty() {
    console.log(this.contactDTO);
  }

}
