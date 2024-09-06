import QuarterRemainder from "./quarter-remainder";

class LuCalendar extends QuarterRemainder {
  protected high_origin_ad: number = -2763680;
  protected high_origin_60: number = 36;

  public constructor(year: number) {
    super(year, "Lu");
    this.year.set_high_origin(this.high_origin_ad);
  }
}

export default LuCalendar;
