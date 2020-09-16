import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '@src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsGuardService implements CanActivate {
  constructor(private LSS: LocalStorageService, private router: Router) {
  }

  lsInit = false;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.lsInit) {
      return true;
    }
    const protocol = this.LSS.retrieve('protocol');
    const server = this.LSS.retrieve('server');
    if ((server != null && server.length < 5) || server == null || protocol == null || (protocol != null && protocol.length < 3)) {
      this.router.navigate(['/settings']);
      return false;
    }

    this.lsInit = true;
    return true;
  }
}
