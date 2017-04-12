export class Country
{
    geonameId:number;
    areaInSqKm:number;
    population:number;
    capitalPopulation:number;
    countryName: string;
    countryCode: string;
    capital: string;
    continent:string;
}

export class GeoName
{
  geonameId: number;
  name: string;
  countryCode:string;
  population:number;
  fcodeName:string;
}