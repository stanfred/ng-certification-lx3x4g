import { Component, OnInit } from '@angular/core';
import { CurrentWeather } from '../current-weather';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  name = 'Angular';
  zipCode: string = '';
  zipCodes = [];
  weatherDataList: CurrentWeather[];
  validZipCode: boolean = false;
  id: number = 1;
  constructor(private weatherService: WeatherService) {
    this.weatherDataList = [];
  }

  ngOnInit() {
    this.validZipCode = false;
    if (JSON.parse(localStorage.getItem('ZIP_CODE_LIST')) == null) {
      localStorage.setItem('ZIP_CODE_LIST', JSON.stringify(this.zipCodes));
    } else {
      this.zipCodes = JSON.parse(localStorage.getItem('ZIP_CODE_LIST'));
      for (let i = 0; i < this.zipCodes.length; i++) {
        this.weatherService
          .localWeather(this.zipCodes[i].zipCode)
          .subscribe((data: any) => {
            let icon = '';
            if (data.weather[0].main == 'Rain') {
              icon = 'https://www.angulartraining.com/images/weather/rain.png';
            } else if (data.weather[0].main == 'Clear') {
              icon = 'https://www.angulartraining.com/images/weather/sun.png';
            } else if (
              data.weather[0].main == 'Clouds' ||
              data.weather[0].main == 'Mist'
            ) {
              icon =
                'https://www.angulartraining.com/images/weather/clouds.png';
            } else if (data.weather[0].main == 'Snow') {
              icon = 'https://www.angulartraining.com/images/weather/snow.png';
            }
            const weather = new CurrentWeather(
              this.zipCodes[i].id,
              data.name,
              this.zipCodes[i].zipCode,
              data.main.temp,
              icon,
              data.weather[0].description,
              data.main.temp_max,
              data.main.temp_min
            );
            this.weatherDataList.push(weather);
          });
      }
    }
    if (localStorage.getItem('ID') == null) {
      localStorage.setItem('ID', this.id.toString());
    } else {
      this.id = parseInt(localStorage.getItem('ID'));
    }
  }
  onAddZipCode() {
    if (this.zipCode == '' || this.zipCode == null || this.zipCode == null) {
      this.validZipCode = true;
      return false;
    } else {
      this.validZipCode = false;
      const zipCode = this.zipCode;

      this.weatherService.localWeather(this.zipCode).subscribe((data: any) => {
        let icon = '';
        if (data.weather[0].main == 'Rain') {
          icon = 'https://www.angulartraining.com/images/weather/rain.png';
        } else if (data.weather[0].main == 'Clear') {
          icon = 'https://www.angulartraining.com/images/weather/sun.png';
        } else if (
          data.weather[0].main == 'Clouds' ||
          data.weather[0].main == 'Mist'
        ) {
          icon = 'https://www.angulartraining.com/images/weather/clouds.png';
        } else if (data.weather[0].main == 'Snow') {
          icon = 'https://www.angulartraining.com/images/weather/snow.png';
        }

        this.zipCodes.push({ id: this.id, zipCode: zipCode });
        const weather = new CurrentWeather(
          this.id++,
          data.name,
          zipCode,
          data.main.temp,
          icon,
          data.weather[0].description,
          data.main.temp_max,
          data.main.temp_min
        );
        this.weatherDataList.push(weather);
        localStorage.setItem('ZIP_CODE_LIST', JSON.stringify(this.zipCodes));
        localStorage.setItem('ID', this.id.toString());
      });
      this.zipCode = '';
      this.zipCodes = JSON.parse(localStorage.getItem('ZIP_CODE_LIST'));
    }
  }

  removeFromList(id: number) {
    var index = this.weatherDataList.findIndex(function (o) {
      return o.id == id;
    });
    if (index !== -1) {
      this.weatherDataList.splice(index, 1);
    }

    var zipCodeList = JSON.parse(localStorage.getItem('ZIP_CODE_LIST'));
    var index2 = zipCodeList.findIndex(function (o) {
      return o.id == id;
    });

    if (index !== -1) {
      zipCodeList.splice(index2, 1);
      localStorage.setItem('ZIP_CODE_LIST', JSON.stringify(zipCodeList));
    }
  }

  onInput() {
    if (
      this.zipCode == '' ||
      this.zipCode == null ||
      this.zipCode == undefined
    ) {
      this.validZipCode = true;
    } else {
      this.validZipCode = false;
    }
  }
}
