import { Component, OnInit } from '@angular/core';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { ContactsService } from '@src/app/core/services/api/contacts.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '@src/app/components/contatcs/Contact';

@Component({
  selector: 'app-contacts.detail',
  templateUrl: './contacts.detail.component.html',
  styleUrls: ['./contacts.detail.component.scss']
})
export class ContactsDetailComponent implements OnInit {

  contact: Contact;

  constructor(
    private helper: HelperService,
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['contactId']) {
        this.contactsService.getContact(Number(params['contactId'])).subscribe((contact: Contact) => {
          this.contact = contact;
          console.log('aaa get contact', this.contact);
        });
      }
    });
  }

  ngOnInit() {

  }

  onDrawerButtonTap(): void {
    this.helper.onDrawerButtonTap();
  }

}
