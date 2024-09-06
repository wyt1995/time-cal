import QuarterRemainder from "../quarter-remainder";
import Year from "../year";
import ZhouCalendar from "../zhou-calendar";

describe("The Zhou Calendar should overwrites the superclass", () => {
  let spring_autumn: QuarterRemainder;
  let xi_five: Year;

  let west_han: QuarterRemainder;
  let grand_inception: Year;

  let zhou_with_leap: QuarterRemainder;
  let leap_year: Year;

  beforeEach(() => {
    spring_autumn = new ZhouCalendar(-654);
    xi_five = spring_autumn.calculate();

    west_han = new ZhouCalendar(-103);
    grand_inception = west_han.calculate();

    zhou_with_leap = new ZhouCalendar(-101);
    leap_year = zhou_with_leap.calculate();
  });

  it("initialize year instances", () => {
    expect(xi_five.get_year()).toBe(-654);
    expect(xi_five.years_from_origin()).toBe(2759769);

    expect(grand_inception.get_year()).toBe(-103);
    expect(grand_inception.years_from_origin()).toBe(2760320);

    expect(leap_year.get_year()).toBe(-101);
    expect(leap_year.years_from_origin()).toBe(2760322);
  });

  it("set year name", () => {
    expect(xi_five.get_year_name()).toBe(2);
    expect(grand_inception.get_year_name()).toBe(13);
    expect(leap_year.get_year_name()).toBe(15);
  });

  it("set leap year", () => {
    expect(xi_five.is_leap_year()).toBe(false);
    expect(grand_inception.is_leap_year()).toBe(false);
    expect(leap_year.is_leap_year()).toBe(true);
  });

  it("compute winter solstice", () => {
    expect(spring_autumn.winter_solstice()).toBeCloseTo(47.25);
    expect(west_han.winter_solstice()).toBe(0);
    expect(zhou_with_leap.winter_solstice()).toBeCloseTo(10.5);
  });

  it("compute the first month", () => {
    expect(spring_autumn.standard_month()).toBeCloseTo(47.25);
    expect(west_han.standard_month()).toBe(0);
    expect(zhou_with_leap.standard_month()).toBeCloseTo(48.74042553);
  });

  it("set intercalary month", () => {
    expect(xi_five.intercalary_month_index()).toBe(0);
    expect(grand_inception.intercalary_month_index()).toBe(0);
    expect(leap_year.intercalary_month_index()).toBe(8);

    const rule_6: Year = new ZhouCalendar(-98).calculate();
    expect(rule_6.intercalary_month_index()).toBe(5);

    const rule_9: Year = new ZhouCalendar(-95).calculate();
    expect(rule_9.intercalary_month_index()).toBe(2);

    const rule_11: Year = new ZhouCalendar(-93).calculate();
    expect(rule_11.intercalary_month_index()).toBe(11);

    const rule_14: Year = new ZhouCalendar(-90).calculate();
    expect(rule_14.intercalary_month_index()).toBe(7);

    const rule_17: Year = new ZhouCalendar(-87).calculate();
    expect(rule_17.intercalary_month_index()).toBe(3);

    const rule_19: Year = new ZhouCalendar(-85).calculate();
    expect(rule_19.intercalary_month_index()).toBe(12);
  });
});
