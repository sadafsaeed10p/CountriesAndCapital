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
var CountryDetailComponent = (function () {
    function CountryDetailComponent(router, route, countryService) {
        this.router = router;
        this.route = route;
        this.countryService = countryService;
        this.capitals = [];
        this.neighbours = [];
        this.isNeighboursExist = true;
    }
    CountryDetailComponent.prototype.ngOnInit = function () {
        this.isLoading = true;
        this.loadCountryDetail(this.router.snapshot.params['countryCode']);
    };
    CountryDetailComponent.prototype.loadCountryDetail = function (countryCode) {
        var _this = this;
        this.countryService.getCountryDetail(countryCode).toPromise()
            .then(function (c) {
            _this.country = c[0];
            _this.countryService.getCapitalPopultion(countryCode).toPromise()
                .then(function (cap) {
                //Get the Capital population
                _this.capitals = cap;
                var filterCapital = _this.capitals.filter(function (capital) { return capital.fcodeName.toLowerCase() == "capital of a political entity"; });
                _this.country.capitalPopulation = filterCapital.length > 0 ? filterCapital[0].population : 0;
                _this.countryService.getNeighbouringCountries(_this.country.geonameId).toPromise()
                    .then(function (neighbors) {
                    _this.isLoading = false;
                    if (neighbors.length > 0)
                        _this.neighbours = neighbors.slice(0, 3); //Pick top 3 neughbours
                    else
                        _this.isNeighboursExist = false;
                });
            });
        });
    };
    CountryDetailComponent.prototype.navigate = function (countryCode) {
        this.route.navigate(['/countries', countryCode]);
        this.isLoading = true;
        this.loadCountryDetail(countryCode);
    };
    return CountryDetailComponent;
}());
CountryDetailComponent = __decorate([
    core_1.Component({
        selector: 'country-Detail',
        templateUrl: './Views/CountryDetailView.html',
        styleUrls: ['./CustomStyles/countryDetails.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, CountryService_1.CountryService])
], CountryDetailComponent);
exports.CountryDetailComponent = CountryDetailComponent;
//# sourceMappingURL=CountryDetailComponent.js.map