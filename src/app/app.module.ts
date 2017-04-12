import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent }  from './app.component';
import { HomeComponent } from './Home.Component';
import { CountriesComponent } from './Countries.Component';
import { CountryDetailComponent } from './CountryDetailComponent';
import { CountryService } from './Services/CountryService';

export const router: Routes = [
    { path: "", component: HomeComponent },
    { path: "countries",  component: CountriesComponent },
    { path: "countries/:countryCode", component: CountryDetailComponent }
];

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(router)],
  declarations: [ AppComponent, HomeComponent, CountriesComponent, CountryDetailComponent ],
  providers:    [ CountryService ],
  bootstrap:    [ AppComponent ]
})

export class AppModule {}

