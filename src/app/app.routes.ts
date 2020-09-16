import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/components/home/home.component';
import { ContatcsComponent } from '@src/app/components/contatcs/contatcs.component';
import { SettingsComponent } from '@src/app/components/settings/settings.component';
import { LoginComponent } from '@src/app/components/login/login.component';
import { NonAuthGuardService } from '@src/app/core/services/guards/non-auth-guard.service';
import { AuthGuardService as AuthGuard } from '@src/app/core/services/guards/auth-guard.service';
import { ContactsDetailComponent } from '@src/app/components/contatcs/contacts.detail/contacts.detail.component';
import { ActivityDetailComponent } from '@src/app/components/home/activity.detail/activity.detail.component';
import { ContacsDetailEditComponent } from '@src/app/components/contatcs/contacs.detail.edit/contacs.detail.edit.component';
import { ContacsDetailAddComponent } from '@src/app/components/contatcs/contacs.detail.add/contacs.detail.add.component';
import { ActivityDetailAddComponent } from '@src/app/components/home/activity.detail.add/activity.detail.add.component';
import { ActivityDetailEditComponent } from '@src/app/components/home/activity.detail.edit/activity.detail.edit.component';



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
    path: 'contacts-edit/:contactId',
    component: ContacsDetailEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacts-add',
    component: ContacsDetailAddComponent,
    canActivate: [AuthGuard],
  },
  {
       path: 'settings',
       component: SettingsComponent,
    canActivate: [NonAuthGuardService],
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
  {
    path: 'activity/activity-edit/:activityId',
    component: ActivityDetailEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'activity-add',
    component: ActivityDetailAddComponent,
    canActivate: [AuthGuard]
  },
];
