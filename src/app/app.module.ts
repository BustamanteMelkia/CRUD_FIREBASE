import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routing
import { AppRoutingModule } from 'src/app/app.routing.module';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
// import { HerosService } from "src/app/services/heros.service";

// Importar los componentes
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
