import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {AuthStateService} from '@src/app/core/services/state/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuardService implements CanActivate {

  constructor (
    private authStateService: AuthStateService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authStateService.getIsLoggedIn()) {
      // navigate to login
      void this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
