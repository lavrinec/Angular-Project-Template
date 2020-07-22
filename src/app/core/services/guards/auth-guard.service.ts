import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthStateService} from '@src/app/core/services/state/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor (
    private authStateService: AuthStateService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authStateService.getIsLoggedIn()) {
      console.log('Not logged in');
      // set initial redirect state
      this.authStateService.initialRedirectUrl = state.url.split('?')[0];
      this.authStateService.initialQueryParams = route.queryParams;
      // navigate to login
      void this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
