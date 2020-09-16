import {Component, OnInit, ViewChild} from '@angular/core';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { ContactsService } from '@src/app/core/services/api/contacts.service';
import { Contact } from '@src/app/components/Classes/Contact';
import {
  EditService,
  PageSettingsModel,
  PageService,
  ToolbarService,
  GridComponent
} from '@syncfusion/ej2-angular-grids';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {DialogComponent, DialogUtility} from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-contatcs',
  templateUrl: './contatcs.component.html',
  styleUrls: ['./contatcs.component.scss'],
  providers: [EditService, PageService, ToolbarService]
})
export class ContatcsComponent implements OnInit {
   data: Contact[] = [];
   pageSettings: PageSettingsModel =  { pageCount: 4, pageSize: 30 };
  searchString;

  // SF grid
  @ViewChild('contactsGrid', {static: true}) gridComponent: GridComponent;

  // detail
  contactInEdit: Contact;
  @ViewChild('contactDetailDialog', {static: true}) contactDetailDialogObj: DialogComponent;

  // other
  loading = false;
  userInputDelayTimeout;
  currentSearchRequest: Subscription;

  constructor(
    private helper: HelperService,
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.search('Marko Bezjak');
  }
  onDrawerButtonTap(): void {
    this.helper.onDrawerButtonTap();
  }

  search(searchString) {
    // delay da ne gremo po podatke kadar upoabnik hitro tipka
    clearTimeout(this.userInputDelayTimeout);
    this.userInputDelayTimeout = setTimeout(() => {
      this.loading = true;
      if (this.currentSearchRequest) { this.currentSearchRequest.unsubscribe(); }
      this.currentSearchRequest = this.contactsService.search(searchString).subscribe((res: Contact[]) => {
        this.data = res;
        this.loading = false;
      });
    }, 300);
  }

  onTextChange(args) {
    this.searchString = this.helper.searchBarText(args);
    this.search(this.searchString);
  }
  onClear(args) {
    this.search('');
    console.log(`Clear event raised`);
  }
  onSubmit(args) {
    this.searchString = this.helper.searchBarText(args);
    this.search(this.searchString);
  }

  openDetail(contactId) {
    console.log('aaaaaaa');
    this.contactsService.getContact(contactId).subscribe((res: Contact) => {
      console.log('aaaaaa get contact', res);
      this.contactInEdit = res;
      this.contactDetailDialogObj.show();
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

  onActionBegin(args) {
    console.log('aaaa onActionBegin', args);
  }

  onBeforeBatchAdd(args) {
    args.cancel = true;
    this.contactInEdit = new Contact();
    this.contactDetailDialogObj.show();
  }
  onBeforeBatchDelete(args, force = false) {
    if (!force) {
      args.cancel = true;
      const confirmDeleteDialog = DialogUtility.confirm({
        title: 'Ste prepričani da želite izbrisati kontaktno osebo?',
        okButton: {text: 'Izbriši', cssClass: 'e-danger', click: () => {
            confirmDeleteDialog.hide();
            this.contactsService.deleteContact(args.rowData.id).subscribe(() => {
              this.gridComponent.deleteRecord(args.rowData);
            });
          }},
        cancelButton: {text: 'Prekliči', cssClass: '', click: () => {
            confirmDeleteDialog.hide();
          }}
      });
    } else {

    }
  }

  // editing
  contactEditSave() {
    this.contactsService.patchContacts([this.contactInEdit]).subscribe(() => {
      this.contactDetailDialogObj.hide();
      this.gridComponent.setRowData(this.contactInEdit.id, this.contactInEdit);
      this.contactInEdit = null;
    });
  }

  contactAddNew() {
    if (!this.contactInEdit.firstName || this.contactInEdit.firstName.length === 0 ||
        !this.contactInEdit.lastName || this.contactInEdit.lastName.length === 0
    ) {
      DialogUtility.alert({
        title: 'Manjkajoči podakti',
        content: 'Ime in priimek sta obvezna podatka.'
      });
      return;
    }
    this.contactsService.createContact(this.contactInEdit).subscribe((contact: object) => {
      this.contactDetailDialogObj.hide();
      this.contactInEdit = null;
      // this.search(this.searchString);
      const contactObj = Object.assign(new Contact(), contact);
      this.data.splice(0, 0, contactObj);
      this.data = [...this.data];
    });
  }

  add() {
    this.router.navigate(['contacts-add']);
  }

}
