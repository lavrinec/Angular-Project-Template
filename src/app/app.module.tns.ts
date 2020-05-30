import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ComponentsModuleTns } from '@shared/components/components.module.tns';
import { CoreModuleTns } from '@core/core.module.tns';
import { PipesModuleTns } from '@shared/pipes/pipes.module.tns';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    CoreModuleTns,
    ComponentsModuleTns,
    PipesModuleTns,
    TranslateModule.forRoot(),
  ],
  providers: [
    TranslateService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
