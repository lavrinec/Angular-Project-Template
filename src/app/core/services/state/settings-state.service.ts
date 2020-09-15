import { Injectable } from '@angular/core';
import { LocalStorageService } from '@src/app/shared/services/local-storage.service';

export class SettingsModel {
  connection: {
    protocol: 'http'|'https',
    serverLocation: string,
    // clientLocation: string,
  };
}

@Injectable({
  providedIn: 'root'
})
export class SettingsStateService {
  settings: SettingsModel = {
    connection: {
      protocol: 'https',
      serverLocation: 'demo.manto.net:4000',
      // clientLocation: window.location.hostname + '' + window.location.port
    }
  };

  constructor(
    private LSS: LocalStorageService
  ) {
    this.settings.connection.serverLocation = this.LSS.retrieve('server');
    this.settings.connection.protocol = this.LSS.retrieve('protocol');
    console.log('settings', this.settings);

  }

  UpdateSettings() {
    this.settings.connection.serverLocation = this.LSS.retrieve('server');
    this.settings.connection.protocol = this.LSS.retrieve('protocol');
    console.log('settings', this.settings);
  }
}
