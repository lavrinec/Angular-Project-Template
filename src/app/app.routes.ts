import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import {LoginComponent} from '@src/app/login/login.component';
import {AuthGuardService as AuthGuard} from '@src/app/core/services/guards/auth-guard.service';
import {ContactsComponent} from '@src/app/contacts/contacts.component';
import { NonAuthGuardService } from '@src/app/core/services/guards/non-auth-guard.service';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'contacts',
      component: ContactsComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'login',
      component: LoginComponent,
      canActivate: [NonAuthGuardService]
  }
];
