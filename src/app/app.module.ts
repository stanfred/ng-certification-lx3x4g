import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { FutureComponent } from './future/future.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { MainComponent } from './main/main.component';
import { WeatherService } from './weather.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  declarations: [AppComponent, HelloComponent, FutureComponent, MainComponent],
  providers: [WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
