import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {}

  localWeather(zipCode: string) {
    let params = new HttpParams()
      .set('zip', zipCode)
      .set('units', 'imperial')
      .set('appid', '5a4b2d457ecbef9eb2a71e480b947604');
    return this.http.get('https://api.openweathermap.org/data/2.5/weather', {
      params,
    });
  }

  getFiveDayForecast(zipCode: string) {
    let params = new HttpParams()
      .set('zip', zipCode)
      .set('units', 'imperial')
      .set('appid', '5a4b2d457ecbef9eb2a71e480b947604');
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast', {
      params,
    });
  }
}
