import { Component, OnInit } from '@angular/core';
import { HelperService } from '@src/app/core/services/utils/helper.service';

@Component({
  selector: 'app-contatcs',
  templateUrl: './contatcs.component.html',
  styleUrls: ['./contatcs.component.scss']
})
export class ContatcsComponent implements OnInit {

  constructor(private helper: HelperService) { }

  ngOnInit() {
  }
  onDrawerButtonTap(): void {
    this.helper.onDrawerButtonTap();
  }
}
