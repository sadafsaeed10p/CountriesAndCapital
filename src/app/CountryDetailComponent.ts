import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountryService } from './Services/CountryService';
import { Country, GeoName } from './Entities/Country';

@Component({
    selector: 'country-Detail',
    templateUrl: './Views/CountryDetailView.html',
    styleUrls: ['./CustomStyles/countryDetails.css']
})

export class CountryDetailComponent implements OnInit {
 
    constructor(private router: ActivatedRoute, private route: Router, private countryService: CountryService) { }

    country:Country;
    capitals: GeoName[] = [];
    neighbours: GeoName[] = [];
    isLoading: boolean; 
    isNeighboursExist:boolean = true;

    ngOnInit(): void 
    {
        this.isLoading = true;
        this.loadCountryDetail(this.router.snapshot.params['countryCode']);
    }

    loadCountryDetail(countryCode:string):void
    {  
        this.countryService.getCountryDetail(countryCode).toPromise()
        .then(c => 
        {
          this.country = c[0]
          this.countryService.getCapitalPopultion(countryCode).toPromise()
          .then(cap => 
          {
            //Get the Capital population
            this.capitals = cap;
            let filterCapital:GeoName[] = this.capitals.filter(capital => capital.fcodeName.toLowerCase() == "capital of a political entity");
            this.country.capitalPopulation = filterCapital.length > 0 ? filterCapital[0].population : 0;

            this.countryService.getNeighbouringCountries(this.country.geonameId).toPromise()
            .then(neighbors => 
            {
                this.isLoading = false;
                if(neighbors.length > 0)
                  this.neighbours = neighbors.slice(0,3); //Pick top 3 neughbours
                else
                  this.isNeighboursExist = false;
            })
          })
       }); 
    }

    navigate(countryCode:string):void
    {
      this.route.navigate(['/countries',countryCode]);
      this.isLoading = true;
      this.loadCountryDetail(countryCode);
    }
}