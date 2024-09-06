import QuarterRemainder from "./quarter-remainder";

class ZhouCalendar extends QuarterRemainder {
  protected high_origin_ad: number = -2760423;
  protected high_origin_60: number = 53;

  public constructor(year: number) {
    super(year, "Zhou");
    this.year.set_high_origin(this.high_origin_ad);
  }
}

export default ZhouCalendar;
