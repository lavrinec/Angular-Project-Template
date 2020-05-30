import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Si } from '@src/i18n/si';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private readonly translate: TranslateService) {}

  ngOnInit() {
      this.translate.setTranslation('si', Si);
      this.translate.setDefaultLang('si');
      this.translate.use('si');
  }
}
