import { Component, OnInit } from '@angular/core';
import { HelperService } from '@src/app/helper.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'sass-project';

  constructor(private helper: HelperService) { }

  ngOnInit() {
  }

  onDrawerButtonTap(): void {
    this.helper.onDrawerButtonTap();
  }
}
