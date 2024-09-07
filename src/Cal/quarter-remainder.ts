import Year from "./year";

/**
 * The Quarter Remainder calendar system includes the six calendars in the Warring States era,
 * the official SiFen calendar in the eastern Han, as well as the Grand Inception / Triple Concordance calendar,
 * which can be considered as a variant of the SiFen calendar system.
 */
abstract class QuarterRemainder {
  protected tropical_year: number = 365.25;
  protected lunar_month: number = 29 + 499 / 940;
  protected year_factor: number = 4;
  protected year_number: number = 1461;
  protected qi_factor: number = 32;
  protected month_factor: number = 940;
  protected month_number: number = 27759;
  protected intercalation_months: number = 7;
  protected intercalation_factor: number = 19;
  protected rule_months: number = 235;
  protected bu_factor: number = 76;
  protected era_factor: number = 1520;
  protected origin_factor: number = 4560;
  protected high_origin_ad: number = -2760366;
  protected high_origin_60: number = 50;
  protected first_month: number = 0;
  protected first_day: number = 0;
  protected year: Year;
  
  protected constructor(year_ce: number, cal_name: string) {
    const diff = year_ce - this.high_origin_ad;
    this.year = new Year(year_ce, diff, cal_name);
  }

  /**
   * Initiate computation for the given year.
   * @returns the year attribute that can be used for display.
   */
  public calculate(): Year {
    this.set_year_name();
    this.set_leap_year();
    this.calculate_solar_qi();
    this.calculate_lunar_months();
    this.year.set_intercalary_month();
    return this.year;
  }

  /**
   * Set the sexagenary year number for the year attribute.
   */
  protected set_year_name(): void {
    const years_into_era = this.year.years_from_origin() % this.origin_factor;
    const year_remainder = (years_into_era + this.high_origin_60) % 60;
    this.year.set_year_name(year_remainder);
  }

  /**
   * Set the is_leap attribute to true if there is an intercalary month in this year.
   */
  private set_leap_year(): void {
    const year_into_bu = this.year.years_from_origin() % this.era_factor % this.bu_factor;
    const intercalation_remainder = year_into_bu * this.rule_months % this.intercalation_factor;
    this.year.set_is_leap(intercalation_remainder >= 12);
  }

  public winter_solstice(): number {
    const year_into_era = this.year.years_from_origin() % this.era_factor;
    const accumulated_days = year_into_era * this.tropical_year + this.first_day;
    return accumulated_days % 60;
  }

  public calculate_solar_qi(): void {
    const qi_interval = this.tropical_year / 24;
    const qi_dates = [this.winter_solstice()];
    for (let i = 0; i < 23; i++) {
      qi_dates[i + 1] = qi_dates[i] + qi_interval;
    }
    this.year.set_qi_date(qi_dates, this.qi_factor);
  }

  public first_month_index(): number {
    return this.first_month;
  }

  public standard_month(): number {
    const year_diff = this.year.years_from_origin();
    const bu_number = Math.floor(year_diff % this.era_factor / this.bu_factor);
    const bu_name = bu_number * (this.month_number % 60) % 60;

    const year_into_bu = (year_diff % this.era_factor) % this.bu_factor;
    const month_into_bu = Math.floor(year_into_bu * this.rule_months / this.intercalation_factor);
    const days_into_bu = month_into_bu * this.lunar_month;
    return (days_into_bu % 60 + bu_name + this.first_day) % 60;
  }

  public calculate_lunar_months(): void {
    const half_month: number = this.lunar_month / 2;
    const total_months: number = this.year.is_leap_year() ? 13 : 12;
    const month_dates: number[] = [this.standard_month()];
    for (let i = 0; i < total_months * 2 - 1; i++) {
      month_dates.push(month_dates[i] + half_month);
    }
    this.year.set_moon_dates(month_dates, this.month_factor);
  }
}

export default QuarterRemainder;
