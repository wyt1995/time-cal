import QuarterRemainder from "../quarter-remainder";
import TripleConcordance from "../triple-concordance";
import Year from "../year";

describe("Triple Concordance Calendar", () => {
  let west_han: TripleConcordance;
  let grand_inception: Year;
  let era_end: TripleConcordance;
  let prev_year: Year;

  beforeEach(() => {
    west_han = new TripleConcordance(-103);
    grand_inception = west_han.calculate();

    era_end = new TripleConcordance(-104);
    prev_year = era_end.calculate();
  });

  it("initialize year instances", () => {
    expect(grand_inception.get_year()).toBe(-103);
    expect(grand_inception.years_from_origin()).toBe(143127);
    expect(prev_year.get_year()).toBe(-104);
    expect(prev_year.years_from_origin()).toBe(143126);
  });

  it("set year name", () => {
    expect(grand_inception.get_year_name()).toBe(12);
    expect(prev_year.get_year_name()).toBe(11);
    expect(new TripleConcordance(-1121).calculate().get_year_name()).toBe(7);
    expect(new TripleConcordance(-1737).calculate().get_year_name()).toBe(47);
  });

  it("set leap year", () => {
    expect(grand_inception.is_leap_year()).toBe(false);
    expect(prev_year.is_leap_year()).toBe(true);
  });

  it("compute winter solstice", () => {
    expect(west_han.winter_solstice()).toBe(0);
    expect(era_end.winter_solstice()).toBeCloseTo(54.74984);
  });

  it("compute medial qi", () => {
    const expected: number[][] = [
      [0.0, 0, 0],
      [30.437514, 30, 2020],
      [60.875027, 0, 4040],
      [91.312541, 31, 1443],
      [121.750054, 1, 3463],
      [152.187568, 32, 866],
      [182.625081, 2, 2886],
      [213.062595, 33, 289],
      [243.500108, 3, 2309],
      [273.937621, 33, 4329],
      [304.375135, 4, 1732],
      [334.812649, 34, 3752]
    ];
    const actual = grand_inception.medial_qi_times();
    for (let i = 0; i < 12; i++) {
      expect(actual[i][0]).toBeCloseTo(expected[i][0]);
      expect(actual[i][1]).toBe(expected[i][1]);
      expect(actual[i][2]).toBe(expected[i][2]);
    }
  });

  it("compute the first month", () => {
    expect(west_han.standard_month()).toBe(0);
    expect(era_end.standard_month()).toBeCloseTo(36.0988);
  });

  it("compute new-moon dates", () => {
    const expected: number[][] = [
      [36.0988, 36, 8],
      [65.62966, 5, 51],
      [95.16053, 35, 13],
      [124.69139, 4, 56],
      [154.22226, 34, 18],
      [183.75312, 3, 61],
      [213.28399, 33, 23],
      [242.81485, 2, 66],
      [272.34571, 32, 28],
      [301.87658, 1, 71],
      [331.40744, 31, 33],
      [360.93831, 0, 76],
      [390.46917, 30, 38]
    ];
    const actual = prev_year.new_moon_times();
    for (let i = 0; i < 13; i++) {
      expect(actual[i][0]).toBeCloseTo(expected[i][0]);
      expect(actual[i][1]).toBe(expected[i][1]);
      expect(actual[i][2]).toBe(expected[i][2]);
    }
  });

  it("set intercalary month", () => {
    expect(grand_inception.intercalary_month_index()).toBe(0);
    expect(prev_year.intercalary_month_index()).toBe(12);
  });
});
