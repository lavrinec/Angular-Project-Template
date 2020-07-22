import { Directive } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

@Directive({
  selector: '[appHideActionBar]'
})

export class HideActionBarDirectiveTns {
  constructor(private page: Page) {
    this.page.actionBarHidden = true;
  }
}
