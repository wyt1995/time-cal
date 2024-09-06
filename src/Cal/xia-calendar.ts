import QuarterRemainder from "./quarter-remainder";

class XiaCalendar extends QuarterRemainder {
  protected high_origin_ad: number = -2759875;
  protected high_origin_60: number = 1;

  public constructor(year: number) {
    super(year, "Xia");
    this.year.set_high_origin(this.high_origin_ad);
  }
}

export default XiaCalendar;
