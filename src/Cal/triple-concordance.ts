import QuarterRemainder from "./quarter-remainder";

class TripleConcordance extends QuarterRemainder {
  protected tropical_year: number = 365 + 385 / 1539;
  protected lunar_month: number = 29 + 43 / 81;
  protected year_factor: number = 1539;
  protected year_number: number = 562120;
  protected qi_factor: number = 4617;
  protected month_factor: number = 81;
  protected month_number: number = 2392;
  protected bu_factor: number = 19;
  protected era_factor: number = 1539;
  protected origin_factor: number = 4617;
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
    this.year.set_year_name(Math.floor(year_name));
  }

  public winter_solstice(): number {
    const year_into_origin = this.year.years_from_origin() % this.origin_factor;
    const accumulated_days = year_into_origin * (this.tropical_year - 360);
    return accumulated_days % 60;
  }

  public standard_month(): number {
    const years_into_origin = this.year.years_from_origin() % this.origin_factor;
    const era_order = Math.floor(years_into_origin / this.era_factor);
    const era_name = era_order * 8080 % 60;

    const year_into_era = years_into_origin % this.era_factor;
    const months_into_era = Math.floor(year_into_era * this.rule_months / this.intercalation_factor);
    const days_into_era = months_into_era * this.month_number / this.month_factor;
    return (days_into_era % 60 + era_name) % 60;
  }
}

export default TripleConcordance;
