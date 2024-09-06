import QuarterRemainder from "./quarter-remainder";
import Year from "./year";

class TripleConcordance extends QuarterRemainder {
  protected tropical_year: number = 365 + 385 / 1539;
  protected lunar_month: number = 29 + 43 / 81;
  protected year_factor: number = 1539;
  protected year_number: number = 562120;
  protected month_factor: number = 81;
  protected month_number: number = 2392;
  protected era_factor: number = 1539;
  protected origin_factor: number = 4517;
  protected high_origin_ad: number = -143230;
  protected high_origin_60: number = 12;
  protected close_origin_ad: number = -103;

  public constructor(year: number) {
    super(year, "SanTong");
    if (year > -103) {
      this.year.set_high_origin(this.close_origin_ad);
    } else {
      this.year.set_high_origin(this.high_origin_ad);
    }
  }

  /**
   * Unlike other calendars, the year name, or the position of the Grand Year,
   * is defined as a strict correspondence with planet Jupiter's movement.
   * This leads to a systematic discrepancy between Liu Xin's year-names and
   * those in the system used from the Eastern Han onwards.
   */
  protected set_year_name(): void {
    const year_diff: number = this.year.get_year() - this.high_origin_ad;
    const station: number = (year_diff % 1728) * 145 / 144;
    const year_name = (station % 60 + this.high_origin_60) % 60;
    this.year.set_year_name(year_name);
  }
}

export default TripleConcordance;
