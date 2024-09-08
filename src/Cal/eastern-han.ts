import QuarterRemainder from "./quarter-remainder";

class EasternHan extends QuarterRemainder {
  protected high_origin_ad: number = -2760480;
  protected high_origin_60: number = 16;
  protected close_origin_ad: number = -160;

  public constructor(year: number) {
    super(year, "SiFen");
    if (year > -160) {
      this.year.set_high_origin(this.close_origin_ad);
    } else {
      this.year.set_high_origin(this.high_origin_ad);
    }
  }
}

export default EasternHan;
