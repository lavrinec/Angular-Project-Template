import { Component, OnInit } from '@angular/core';
import { Helper } from '@core/services/utils/helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  onTap() {
    Helper.onDrawerButtonTap();
  }
}
