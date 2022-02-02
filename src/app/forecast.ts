export class Forecast {
  constructor(
    public date: string,
    public condition: string,
    public minTemp: string,
    public maxTemp: string,
    public icon: string
  ) {}
}
