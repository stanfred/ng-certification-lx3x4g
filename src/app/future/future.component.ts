import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Forecast } from '../forecast';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrls: ['./future.component.css'],
})
export class FutureComponent implements OnInit {
  zipCodeForeCast: Forecast[] = [];
  zipCode: string = '';
  cityName: string = '';
  constructor(
    private weatherService: WeatherService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.zipCode = params['id'];
    });
    this.weatherService
      .getFiveDayForecast(this.zipCode)
      .subscribe((data: any) => {
        this.cityName = data.city.name;
        for (let i = 0; i < data.list.length; i += 8) {
          let icon = '';
          if (data.list[i].weather[0].main == 'Rain') {
            icon = 'https://www.angulartraining.com/images/weather/rain.png';
          } else if (data.list[i].weather[0].main == 'Clear') {
            icon = 'https://www.angulartraining.com/images/weather/sun.png';
          } else if (
            data.list[i].weather[0].main == 'Clouds' ||
            data.list[i].weather[0].main == 'Mist'
          ) {
            icon = 'https://www.angulartraining.com/images/weather/clouds.png';
          } else if (data.list[i].weather[0].main == 'Snow') {
            icon = 'https://www.angulartraining.com/images/weather/snow.png';
          }
          const temp = new Forecast(
            data.list[i].dt_txt,
            data.list[i].weather[0].main,
            data.list[i].main.temp_min,
            data.list[i].main.temp_max,
            icon
          );
          this.zipCodeForeCast.push(temp);
        }
      });
  }
}
