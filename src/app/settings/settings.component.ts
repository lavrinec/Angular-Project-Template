import { Component, OnInit } from '@angular/core';
import { HelperService } from '@src/app/core/services/utils/helper.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private helper: HelperService) { }

  ngOnInit() {
  }
  onDrawerButtonTap(): void {
   this.helper.onDrawerButtonTap();
  }
}
