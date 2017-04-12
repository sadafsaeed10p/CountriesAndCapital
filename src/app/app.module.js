"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var Home_Component_1 = require("./Home.Component");
var Countries_Component_1 = require("./Countries.Component");
var CountryDetailComponent_1 = require("./CountryDetailComponent");
var CountryService_1 = require("./Services/CountryService");
exports.router = [
    { path: "", component: Home_Component_1.HomeComponent },
    { path: "countries", component: Countries_Component_1.CountriesComponent },
    { path: "countries/:countryCode", component: CountryDetailComponent_1.CountryDetailComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, router_1.RouterModule.forRoot(exports.router)],
        declarations: [app_component_1.AppComponent, Home_Component_1.HomeComponent, Countries_Component_1.CountriesComponent, CountryDetailComponent_1.CountryDetailComponent],
        providers: [CountryService_1.CountryService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map