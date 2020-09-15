import { Component, OnInit } from '@angular/core';
import { ContactDTO } from '@src/app/components/Classes/ContactDTO';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { ContactsService } from '@src/app/core/services/api/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '@src/app/components/Classes/Contact';

@Component({
  selector: 'app-contacs.detail.edit',
  templateUrl: './contacs.detail.add.component.html',
  styleUrls: ['./contacs.detail.add.component.scss']
})
export class ContacsDetailAddComponent implements OnInit {

  contact: Contact;
  contactDTO: ContactDTO;

  constructor(
    public helper: HelperService,
    private contactsService: ContactsService,
    private router: Router
  ) {
          this.contactDTO = new ContactDTO();
          this.contactDTO.firstName = '';
          this.contactDTO.lastName = '';
          this.contactDTO.function = '';
          this.contactDTO.mobileNumber = '';
          this.contactDTO.businessNumber = '';
          this.contactDTO.businessAddress = '';
          this.contactDTO.email1 = '';
          console.log('aaa get contact', this.contactDTO);
  }

  ngOnInit() {

  }

  goBack(): void {
    this.helper.goBack();
  }
  save() {
    console.log('aaaaaaaaa edited contact', this.contactDTO);
    this.contact = new Contact();
    this.contact.firstName = this.contactDTO.firstName;
    this.contact.lastName = this.contactDTO.lastName;
    this.contact.function = this.contactDTO.function;
    this.contact.mobileNumber = this.contactDTO.mobileNumber;
    this.contact.businessNumber = this.contactDTO.businessNumber;
    this.contact.businessAddress = this.contactDTO.businessAddress;
    this.contact.email1 = this.contactDTO.email1;
    this.contactsService.createContact(this.contact).subscribe((r) => {
      this.router.navigate(['contacts']);
    });
  }
}
