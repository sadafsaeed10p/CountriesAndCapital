"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/publishReplay");
var CountryService = (function () {
    function CountryService(http) {
        this.http = http;
        this.baseUrl = 'http://api.geonames.org'; // URL to web api
        this.authInfo = new http_1.URLSearchParams();
        this.userName = "sadaf.10p";
        this.authInfo.set('username', this.userName);
    }
    CountryService.prototype.getCountryList = function () {
        var _this = this;
        if (this.data) {
            console.log("Retrieving data from cache...");
        }
        else {
            this.data = this.http.get(this.baseUrl + "/countryInfoJSON", { search: this.authInfo })
                .map(function (response) { return response.json().geonames; })
                .publishReplay(1).refCount() //ref link: http://www.syntaxsuccess.com/viewarticle/caching-with-rxjs-observables-in-angular-2.0
                .catch(function (error) { return _this.showError(error); });
        }
        return this.data;
    };
    CountryService.prototype.getCountryDetail = function (countryCode) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('country', countryCode);
        params.set('username', this.userName);
        return this.http.get(this.baseUrl + "/countryInfoJSON", { search: params })
            .map(function (response) { return response.json().geonames; })
            .catch(function (error) { return _this.showError(error); });
    };
    CountryService.prototype.getCapitalPopultion = function (countryCode) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('country', countryCode);
        params.set('style', 'LONG');
        params.set('operator', 'AND');
        params.set('username', this.userName);
        return this.http.get(this.baseUrl + "/searchJSON", { search: params })
            .map(function (response) { return response.json().geonames; })
            .catch(function (error) { return _this.showError(error); });
    };
    CountryService.prototype.getNeighbouringCountries = function (geoNameId) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('geonameId', geoNameId.toString());
        params.set('username', this.userName);
        return this.http.get(this.baseUrl + "/neighboursJSON", { search: params })
            .map(function (response) { return response.json().geonames; })
            .catch(function (error) { return _this.showError(error); });
    };
    CountryService.prototype.showError = function (error) {
        alert('An error occurred in Country service. ' + error);
        return Promise.reject(error.message || error);
    };
    return CountryService;
}());
CountryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CountryService);
exports.CountryService = CountryService;
//# sourceMappingURL=CountryService.js.map