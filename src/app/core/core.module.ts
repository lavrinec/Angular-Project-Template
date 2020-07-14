import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Helper } from '@core/services/utils/helper';

@NgModule({
  declarations: [],
    providers: [
        Helper
    ],
  imports: [
      CommonModule,
  ],
})
export class CoreModule {}
