import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/components/home/home.component';
import { ContatcsComponent } from '@src/app/components/contatcs/contatcs.component';
import { SettingsComponent } from '@src/app/components/settings/settings.component';
import { LoginComponent } from '@src/app/components/login/login.component';
import { NonAuthGuardService } from '@src/app/core/services/guards/non-auth-guard.service';
import { AuthGuardService as AuthGuard } from '@src/app/core/services/guards/auth-guard.service';
import { ContactsDetailComponent } from '@src/app/components/contatcs/contacts.detail/contacts.detail.component';
import { ActivityDetailComponent } from '@src/app/components/home/activity.detail/activity.detail.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
       path: 'contacts',
       component: ContatcsComponent,
    canActivate: [AuthGuard],
  },
  {
      path: 'contacts/:contactId',
      component: ContactsDetailComponent,
    canActivate: [AuthGuard],
  },
  {
       path: 'settings',
       component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
      path: 'login',
      component: LoginComponent,
    canActivate: [NonAuthGuardService]
  },
  {
    path: 'activity/activity-detail/:activityId',
    component: ActivityDetailComponent,
    canActivate: [AuthGuard]
  },
];
