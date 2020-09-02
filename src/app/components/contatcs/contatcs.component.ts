import { Component, OnInit } from '@angular/core';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { ContactsService } from '@src/app/core/services/api/contacts.service';
import { Contact } from '@src/app/components/contatcs/Contact';
import { EditService } from '@syncfusion/ej2-angular-grids';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contatcs',
  templateUrl: './contatcs.component.html',
  styleUrls: ['./contatcs.component.scss'],
  providers: [EditService]
})
export class ContatcsComponent implements OnInit {
   data: Contact[] = [];
    searchString;

    // other
  currentSearchRequest: Subscription;
  constructor(
    private helper: HelperService,
    private contactsService: ContactsService
  ) {}

  ngOnInit() {
    this.search('');
  }
  onDrawerButtonTap(): void {
    this.helper.onDrawerButtonTap();
  }

  search(searchString = this.searchString) {
    if (this.currentSearchRequest) { this.currentSearchRequest.unsubscribe(); }
    this.currentSearchRequest = this.contactsService.search(searchString).subscribe((res: Contact[]) => {
      this.data = res;
    });
  }

  openDetail(contactId) {
    this.contactsService.getContact(contactId).subscribe((res: Contact) => {
      console.log('aaaaaa get contact', res);
    });
  }

  // grid operations
  onCellSaved(args) {
    console.log('aaaa onCellSaved', args);
    const patchObject = {id: args.rowData.id};
    patchObject[args.columnName] = args.value;
    this.contactsService.patchContacts([patchObject]).subscribe(res => {
      console.log('aaaaa patch successful', res);
    });
  }
}
