import { Component, OnInit } from '@angular/core';

import { AuthStateService } from '@core/services/state/auth-state.service';
import { Helper } from '@core/services/utils/helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private authStateService: AuthStateService,
  ) {
    // Use the component constructor to inject services.
  }

  ngOnInit(): void {

  }

  onTap() {
    Helper.onDrawerButtonTap();
  }

  logout() {
    this.authStateService.logout();
  }
}
