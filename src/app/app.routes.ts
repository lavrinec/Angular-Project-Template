import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { ContatcsComponent } from '@src/app/contatcs/contatcs.component';
import { SettingsComponent } from '@src/app/settings/settings.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
  },
  {
        path: 'contacts',
        component: ContatcsComponent,
  },
    {
        path: 'settings',
        component: SettingsComponent,
    },
];
