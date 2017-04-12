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
var router_1 = require("@angular/router");
var CountryService_1 = require("./Services/CountryService");
var CountriesComponent = (function () {
    function CountriesComponent(router, countryService) {
        this.router = router;
        this.countryService = countryService;
        this.countryList = [];
        this.originalCountryList = [];
    }
    CountriesComponent.prototype.ngOnInit = function () {
        try {
            this.isLoading = true;
            this.getCountries();
        }
        catch (error) {
            alert(error);
        }
    };
    CountriesComponent.prototype.getCountries = function () {
        var _this = this;
        this.countryService.getCountryList()
            .subscribe(function (countries) { _this.isLoading = false; _this.countryList = _this.originalCountryList = countries; });
    };
    CountriesComponent.prototype.onSelect = function (country) {
        this.router.navigate(['/countries', country.countryCode]);
    };
    CountriesComponent.prototype.search = function () {
        var _this = this;
        this.countryList = this.originalCountryList.filter(function (v) { return v.countryName.toLowerCase().indexOf(_this.searchTerm) > -1; });
    };
    return CountriesComponent;
}());
CountriesComponent = __decorate([
    core_1.Component({
        selector: 'country-list',
        templateUrl: './Views/CountriesView.html',
        styleUrls: ['./CustomStyles/countries.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, CountryService_1.CountryService])
], CountriesComponent);
exports.CountriesComponent = CountriesComponent;
//# sourceMappingURL=Countries.Component.js.map