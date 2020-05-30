import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CoreModule } from '@src/app/core/core.module';
import { ComponentsModule } from '@src/app/shared/components/components.module';
import { PipesModule } from '@src/app/shared/pipes/pipes.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ComponentsModule,
    PipesModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
