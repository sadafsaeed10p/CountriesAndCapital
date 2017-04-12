import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CountryService } from './Services/CountryService';
import { Country } from './Entities/Country';

@Component({
    selector: 'country-list',
    templateUrl: './Views/CountriesView.html',
    styleUrls :['./CustomStyles/countries.css']
})
export class CountriesComponent implements OnInit {
 
    constructor(private router: Router, private countryService: CountryService) { }
    countryList: Country[] = [];
    originalCountryList: Country[] = [];
    searchTerm:string;
    isLoading: boolean; 

    ngOnInit(): void 
    {
        try
        {
           this.isLoading = true;
           this.getCountries();
        }
        catch(error){
            alert(error);
        }
    }

  getCountries():void{
      this.countryService.getCountryList()
      .subscribe(countries => {this.isLoading = false; this.countryList = this.originalCountryList = countries});  
  }

  onSelect(country: Country) {
    this.router.navigate(['/countries',country.countryCode]);
  }

  search(): void {
   this.countryList = this.originalCountryList.filter(v => v.countryName.toLowerCase().indexOf(this.searchTerm) > -1);
}

}