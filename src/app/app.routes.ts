import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/other/home/home.component';
import {LoginComponent} from '@src/app/other/login/login.component';
import {AuthGuardService as AuthGuard} from '@src/app/core/services/guards/auth-guard.service';
import {ContactsComponent} from '@src/app/other/contacts/contacts.component';
import { NonAuthGuardService } from '@src/app/core/services/guards/non-auth-guard.service';
import { DashboardComponent } from '@app/other/dashboard/dashboard.component';

export const routes: Routes = [

    {
        path: '',
        component: DashboardComponent,
    },
    //  {
    //                   path: '',
    //                   redirectTo: '/home',
    //                   pathMatch: 'full',
    //               },
    //               {
    //                   path: 'home',
    //                   component: HomeComponent,
    // },
    // {
    //     path: '',
    //     component: LoginComponent,
    //     canActivate: [NonAuthGuardService]
    // },

    // TODO
    // {
    //     path: 'dash',
    //     component: DashboardComponent,
    //     canActivate: [AuthGuard],
    //     children: [
    //         {
    //             path: '',
    //             redirectTo: '/home',
    //             pathMatch: 'full',
    //         },
    //         {
    //             path: 'home',
    //             component: HomeComponent,
    //             canActivate: [AuthGuard]
    //         },
    //         {
    //             path: 'contacts',
    //             component: ContactsComponent,
    //             canActivate: [AuthGuard]
    //         },
    //     ]
    // },
];
