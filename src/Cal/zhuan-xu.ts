import QuarterRemainder from "./quarter-remainder";

class ZhuanXu extends QuarterRemainder {
  protected high_origin_ad: number = -2760305;
  protected high_origin_60: number = 51;
  protected first_month: number = 2;
  protected first_day: number = 5;  // 己巳立春

  public constructor(year: number) {
    super(year, "ZhuanXu");
    this.year.set_high_origin(this.high_origin_ad);
  }

  public winter_solstice(): number {
    const spring_establish: number = super.winter_solstice();
    const rain_waters: number = spring_establish + this.tropical_year / 24;
    return rain_waters;
  }
}

export default ZhuanXu;
