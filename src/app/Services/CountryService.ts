import { Country, GeoName } from '../Entities/Country';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class CountryService
{

    private baseUrl = 'http://api.geonames.org';  // URL to web api
    private authInfo:URLSearchParams = new URLSearchParams();
    private userName:string = "sadaf.10p";
    private data: Observable<Country[]>;

    constructor(private http: Http) 
    { 
        this.authInfo.set('username', this.userName);
    }

    getCountryList(): Observable<Country[]>
    {
        if(this.data)
        {
            console.log("Retrieving data from cache...");
        }
        else
        {
            this.data = this.http.get(`${this.baseUrl}/countryInfoJSON`, {search: this.authInfo})
            .map((response: Response) =>  <Country[]>response.json().geonames)
            .publishReplay(1).refCount() //ref link: http://www.syntaxsuccess.com/viewarticle/caching-with-rxjs-observables-in-angular-2.0
            .catch(error => this.showError(error));
        }
        return this.data;
    }

    getCountryDetail(countryCode:string):Observable<Country>
    {
        let  params = new URLSearchParams();
        params.set('country', countryCode);
        params.set('username', this.userName);
      
        return this.http.get(`${this.baseUrl}/countryInfoJSON`, {search: params})
        .map((response: Response) =>  <Country>response.json().geonames)
        .catch(error => this.showError(error));
    }

    getCapitalPopultion(countryCode: string): Observable<GeoName[]>
    {
        let params = new URLSearchParams();
        params.set('country', countryCode);
        params.set('style', 'LONG');
        params.set('operator', 'AND');
        params.set('username', this.userName);

        return this.http.get(`${this.baseUrl}/searchJSON`, {search: params})
        .map((response: Response) =>  <GeoName[]>response.json().geonames)
        .catch(error => this.showError(error));
    }

    getNeighbouringCountries(geoNameId: number): Observable<GeoName[]>
    {
        let params = new URLSearchParams();
        params.set('geonameId', geoNameId.toString());
        params.set('username', this.userName);

        return this.http.get(`${this.baseUrl}/neighboursJSON`, {search: params})
        .map((response: Response) =>  <GeoName[]>response.json().geonames)
        .catch(error => this.showError(error));
    }

    private showError(error: any): Promise<any> 
    {
        alert('An error occurred in Country service. ' + error);
        return Promise.reject(error.message || error);
    }
}

