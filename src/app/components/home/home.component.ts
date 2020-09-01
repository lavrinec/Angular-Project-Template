import { Component, OnInit } from '@angular/core';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { AuthService } from '@src/app/core/services/api/auth.service';
import { AuthStateService } from '@src/app/core/services/state/auth-state.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'sass-project';

  constructor(
      private authService: AuthService,
      private helper: HelperService,
      private authStateService: AuthStateService,
      private router: Router,
  ) { }

  ngOnInit() {
  }

  onDrawerButtonTap(): void {
    this.helper.onDrawerButtonTap();
  }
  logout() {
    // console.log(this.helper.getAllKeysSettings());
    // console.log('Token', this.helper.getStringSettings('token'));
    this.authStateService.logout();
  }
}
