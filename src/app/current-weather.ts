export class CurrentWeather {
  constructor(
    public id: number,
    public cityName: string,
    public zipCode: string,
    public temp: string,
    public icon: string,
    public weatherKind: string,
    public tempMax: string,
    public tempMin: string
  ) {}
}
