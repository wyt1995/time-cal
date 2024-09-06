import QuarterRemainder from "../quarter-remainder";
import Year from "../year";
import ZhuanXu from "../zhuan-xu";

describe("The Zhuan-Xu calendar starting from spring", () => {
  let zhuanxu: QuarterRemainder;
  let year: Year;
  let zhuanxu_leap: QuarterRemainder;
  let leap_year: Year;

  beforeEach(() => {
    zhuanxu = new ZhuanXu(-289);
    year = zhuanxu.calculate();
    zhuanxu_leap = new ZhuanXu(-303);
    leap_year = zhuanxu_leap.calculate();
  });

  it("initialize year instances", () => {
    expect(year.get_year()).toBe(-289);
    expect(year.years_from_origin()).toBe(2760016);

    expect(leap_year.get_year()).toBe(-303);
    expect(leap_year.years_from_origin()).toBe(2760002);
  });

  it("set year name", () => {
    expect(year.get_year_name()).toBe(7);
    expect(leap_year.get_year_name()).toBe(53);
  });

  it("set leap year", () => {
    expect(year.is_leap_year()).toBe(false);
    expect(leap_year.is_leap_year()).toBe(true);
  });

  it("compute establishment of spring", () => {
    expect(zhuanxu.winter_solstice()).toBeCloseTo(29 + 365.25 / 24);
    expect(zhuanxu_leap.winter_solstice()).toBeCloseTo(30.71875);
  });

  it("compute first month", () => {
    expect(zhuanxu.standard_month()).toBeCloseTo(29.0);
  });

  // TODO: intercalary month test cases
});
