import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { ContactsService } from '@src/app/core/services/api/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  predpona = ['', 'družina', 'g.', 'ga.', 'gdč.', 'mag.', 'dr'];
  pripona = ['',  'dipl.', 'dipl. inž.', 'univ. dipl. inž.', 'dr.', 'dr. med.', 'inž., ml.'];

  constructor(
    public helper: HelperService,
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

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
          this.contactDTO.function = contact.function;
          this.contactDTO.mobileNumber = contact.mobileNumber;
          this.contactDTO.businessNumber = contact.businessNumber;
          this.contactDTO.businessAddress = contact.businessAddress;
          this.contactDTO.email1 = contact.email1;

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
  logProperty() {
    console.log(this.contactDTO);
  }

  sendEmail(email) {
    this.helper.openEmail(email);
  }

  callNumber(phone) {
    this.helper.openPhone(phone);
  }
  edit(contactId) {
    console.log('aaaa  contact edit', contactId);
    this.router.navigate(['contacts-edit/' + contactId]);
  }


}
