import { Component, OnInit } from '@angular/core';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { LocalStorageService } from '@src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { SettingsModel, SettingsStateService } from '@src/app/core/services/state/settings-state.service';

// class Settings {
//   public server = 'serverURL';
//   public protocol = 'https';
//
//   constructor() {}
// }

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  protocol;
  server;
  serverSettings: SettingsModel = this.settingsStateService.settings;
  protocolList: Array<string> = ['http', 'https'];
  constructor(private helper: HelperService,
              private LSS: LocalStorageService,
              private router: Router,
              private settingsStateService: SettingsStateService,
  ) { }

  ngOnInit() {
  }

  onDrawerButtonTap(): void {
   this.helper.onDrawerButtonTap();
  }

  saveServerSettings(): void {
    // console.log('aaaaam server', this.serverSettings.server);
    // console.log('aaaaam protocol', this.serverSettings.protocol);
    // this.LSS.store('server', this.serverSettings.server );
    // this.LSS.store('protocol', this.serverSettings.protocol);
    //
    // console.log('aaaaaa lss server' , this.LSS.retrieve('server'));
    // console.log('aaaaaaa lss protocol', this.LSS.retrieve('protocol'));

    void this.router.navigate(['home'], { replaceUrl: true });
  }
}
