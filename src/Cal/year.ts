import assert from 'assert';

/**
 * The Year class stores information about a year as calculated by a particular calendar.
 * It updates dates and fraction numbers as the calculation unfolds, which will be used in the result section.
 */
class Year {
  protected year_ce: number;
  protected cal_name: string;
  protected year_diff: number;
  protected year_name: number;
  protected is_leap: boolean;
  protected intercalary_month: number;
  protected new_moon_time: number[][];
  protected full_moon_time: number[][];
  protected medial_qi_time: number[][];
  protected nodal_qi_time: number[][];

  /**
   * Constructor for a year instance. Only year number and calendar name are accurate at this point;
   * other attributes will be updated by the calendar compute method.
   * @param year the CE number of the year in astronomical reckoning.
   * @param diff the number of years from the high origin.
   * @param name the name of calendar on which computation is based.
   */
  public constructor(year: number, diff: number, name: string) {
    this.year_ce = year;
    this.cal_name = name;
    this.year_diff = diff;
    this.year_name = 0;
    this.is_leap = false;
    this.intercalary_month = 0;
    this.new_moon_time = [];
    this.full_moon_time = [];
    this.medial_qi_time = [];
    this.nodal_qi_time = [];
  }

  public get_year(): number {
    return this.year_ce;
  }

  public years_from_origin(): number {
    return this.year_diff;
  }

  /**
   * Set the high origin year of the particular calendar.
   * Used for subclass that overrides default attribute value.
   * @param high_origin year number in astronomical reckoning where the year zero exists.
   */
  public set_high_origin(high_origin: number) {
    this.year_diff = this.year_ce - high_origin;
  }

  public get_year_name() {
    return this.year_name;
  }

  public set_year_name(year_name: number) {
    assert(Number.isInteger(year_name));
    assert(year_name >= 0 && year_name < 60);
    this.year_name = year_name;
  }

  public set_is_leap(value: boolean) {
    this.is_leap = value;
  }

  public is_leap_year(): boolean {
    return this.is_leap;
  }

  /**
   * Handle qi time data in a format that is ready for display.
   * Each qi is represented by a raw number, a greater remainder for the sexagenary day cycle,
   * and a lesser remainder for the fractional part of the day.
   * @param qi an array of floats.
   * @param factor the denominator of the day fraction.
   */
  public set_qi_date(qi: number[], factor: number): void {
    assert(qi.length === 24);
    for (let i = 0; i < qi.length; i++) {
      const curr_qi: number = qi[i];
      const curr_qi_date: number = Math.floor(curr_qi) % 60;
      const curr_qi_frac: number = Math.round((curr_qi - Math.floor(curr_qi)) * factor);
      const curr_qi_time: number[] = [curr_qi, curr_qi_date, curr_qi_frac];

      if (i % 2 === 0) {
        this.medial_qi_time.push(curr_qi_time);
      } else {
        this.nodal_qi_time.push(curr_qi_time);
      }
    }
  }

  public medial_qi_times(): ReadonlyArray<ReadonlyArray<number>> {
    return Object.freeze(this.medial_qi_time.map(list => Object.freeze(list)));
  }

  public nodal_qi_times(): ReadonlyArray<ReadonlyArray<number>> {
    return Object.freeze(this.nodal_qi_time.map(list => Object.freeze(list)));
  }

  /**
   * Handle new-moon and full-moon time data in a format that is ready for display.
   * Each date is represented by a raw number, a greater remainder for the sexagenary day cycle,
   * and a lesser remainder for the fractional part of the day.
   * @param moon_dates an array of floats.
   * @param factor the denominator of the month fraction.
   */
  public set_moon_dates(moon_dates: number[], factor: number): void {
    for (let i = 0; i < moon_dates.length; i++) {
      const curr_month: number = moon_dates[i];
      const curr_month_date: number = Math.floor(curr_month) % 60;
      const curr_month_frac: number = Math.round((curr_month - Math.floor(curr_month)) * factor);
      const curr_month_time: number[] = [curr_month, curr_month_date, curr_month_frac];

      if (i % 2 === 0) {
        this.new_moon_time.push(curr_month_time);
      } else {
        this.full_moon_time.push(curr_month_time);
      }
    }
  }

  public new_moon_times(): ReadonlyArray<ReadonlyArray<number>> {
    return Object.freeze(this.new_moon_time);
  }

  public full_moon_times(): ReadonlyArray<ReadonlyArray<number>> {
    return Object.freeze(this.full_moon_time);
  }

  /**
   * Set the index of the intercalary month of the year.
   * This index is set to 0 if it is not a leap year; otherwise, it is the same as the array index.
   * Hence, this number can be directly read as "intercalary i-th month".
   */
  public set_intercalary_month(): void {
    this.checkRep();
    if (!this.is_leap) {
      return;
    }
    let i: number = 0;
    let cycle: number = (this.new_moon_time[0][1] <= this.medial_qi_time[0][1]) ? 0 : 60;
    for ( ; i < 12; i++) {
      const new_moon: number = Math.trunc(this.new_moon_time[i][0]);
      const next_new_moon: number = Math.trunc(this.new_moon_time[i + 1][0]);
      const medial_qi: number = Math.trunc(this.medial_qi_time[i][0]) + cycle;
      if (!(new_moon <= medial_qi && medial_qi < next_new_moon)) {
        break;
      }
    }
    this.intercalary_month = i;
  }

  public intercalary_month_index() {
    return this.intercalary_month;
  }

  /**
   * Check representation by ensuring the number of array elements.
   * @private this function is called before setting the intercalary month.
   */
  private checkRep(): void {
    assert(this.medial_qi_time.length === 12);
    assert(this.nodal_qi_time.length === 12);

    if (this.is_leap) {
      assert(this.new_moon_time.length === 13);
      assert(this.full_moon_time.length === 13);
    } else {
      assert(this.new_moon_time.length === 12);
      assert(this.full_moon_time.length === 12);
    }
  }
}

export default Year;
