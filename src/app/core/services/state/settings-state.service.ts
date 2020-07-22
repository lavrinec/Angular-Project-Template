import { Injectable } from '@angular/core';

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

  constructor() {
    console.log('settings', this.settings);
  }
}
