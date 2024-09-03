import QuarterRemainder from "./quarter-remainder";
import Year from "./year";

class YellowEmperor extends QuarterRemainder {
  protected high_origin_ad: number = -2760149;
  protected high_origin_60: number = 27;
  protected first_month: number = 0;

  public constructor(year: number) {
    super(year, "HuangDi");
    this.year.set_high_origin(this.high_origin_ad);
  }
}

export default YellowEmperor;
