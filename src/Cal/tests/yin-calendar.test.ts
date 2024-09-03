import QuarterRemainder from "../quarter-remainder";
import YinCalendar from "../yin-calendar";
import Year from "../year";

describe("The Yin Calendar as the default subclass of Quarter Remainder", () => {
  let yin_without_leap: QuarterRemainder;
  let not_leap_year: Year;
  let yin_with_leap: QuarterRemainder;
  let leap_year: Year;

  beforeEach(() => {
    yin_without_leap = new YinCalendar(-1069);
    not_leap_year = yin_without_leap.calculate();

    yin_with_leap = new YinCalendar(-1081);
    leap_year = yin_with_leap.calculate();
  });

  it("initialize year instances", () => {
    expect(not_leap_year.get_year()).toBe(-1069);
    expect(not_leap_year.years_from_origin()).toBe(2759297);

    expect(leap_year.get_year()).toBe(-1081);
    expect(leap_year.years_from_origin()).toBe(2759285);
  });

  it("set year name", () => {
    expect(not_leap_year.get_year_name()).toBe(7);
    expect(leap_year.get_year_name()).toBe(55);
  });

  it("set leap year", () => {
    expect(not_leap_year.is_leap_year()).toBe(false);
    expect(leap_year.is_leap_year()).toBe(true);
  });

  it("compute winter solstice", () => {
    expect(yin_without_leap.winter_solstice()).toBeCloseTo(29.25);
    expect(yin_with_leap.winter_solstice()).toBeCloseTo(26.25);

    const xi_five: QuarterRemainder = new YinCalendar(-654);
    expect(xi_five.winter_solstice()).toBe(48);

    const close_origin: QuarterRemainder = new YinCalendar(-1566);
    expect(close_origin.winter_solstice()).toBe(0);
  });

  it("compute twenty-four qi", () => {
    const expected_medial: number[][] = [
      [29.25, 29, 8],
      [59.6875, 59, 22],
      [90.125, 30, 4],
      [120.5625, 0, 18],
      [151.0, 31, 0],
      [181.4375, 1, 14],
      [211.875, 31, 28],
      [242.3125, 2, 10],
      [272.75, 32, 24],
      [303.1875, 3, 6],
      [333.625, 33, 20],
      [364.0625, 4, 2],
    ];
    const expected_nodal: number[][] = [
      [44.46875, 44, 15],
      [74.90625, 14, 29],
      [105.34375, 45, 11],
      [135.78125, 15, 25],
      [166.21875, 46, 7],
      [196.65625, 16, 21],
      [227.09375, 47, 3],
      [257.53125, 17, 17],
      [287.96875, 47, 31],
      [318.40625, 18, 13],
      [348.84375, 48, 27],
      [379.28125, 19, 9]
    ];

    const medial = not_leap_year.medial_qi_times();
    const nodal = not_leap_year.nodal_qi_times();
    expect(medial).toEqual(expected_medial);
    expect(nodal).toEqual(expected_nodal);

    // test array to be immutable
    expect(() => {
      (medial as number[][]).push([0, 0, 0]);
    }).toThrow();

    expect(() => {
      (nodal[0] as number[])[0] = 0;
    }).toThrow();
  });

  it("compute the first month", () => {
    expect(yin_without_leap.standard_month()).toBeCloseTo(26.14148936);
    expect(yin_with_leap.standard_month()).toBeCloseTo(6.04468086);

    const xi_five: QuarterRemainder = new YinCalendar(-654);
    expect(xi_five.standard_month()).toBe(48);
  });

  it("compute new-moon and full-moon for the year", () => {
    const expected_new_moon: number[][] = [
      [26.141489, 26, 133],
      [55.672340, 55, 632],
      [85.203191, 25, 191],
      [114.734043, 54, 690],
      [144.264894, 24, 249],
      [173.795745, 53, 748],
      [203.326596, 23, 307],
      [232.857447, 52, 806],
      [262.388298, 22, 365],
      [291.919149, 51, 864],
      [321.450000, 21, 423],
      [350.980851, 50, 922],
    ];
    const actual_new_moon = not_leap_year.new_moon_times();
    for (let i = 0; i < 12; i++) {
      expect(actual_new_moon[i][0]).toBeCloseTo(expected_new_moon[i][0]);
      expect(actual_new_moon[i][1]).toBe(expected_new_moon[i][1]);
      expect(actual_new_moon[i][2]).toBe(expected_new_moon[i][2]);
    }

    const expected_full_moon: number[][] = [
      [40.906915, 40, 852],
      [70.437766, 10, 411],
      [99.968617, 39, 910],
      [129.499468, 9, 469],
      [159.030319, 39, 28],
      [188.561170, 8, 527],
      [218.092021, 38, 86],
      [247.622872, 7, 585],
      [277.153723, 37, 144],
      [306.684574, 6, 643],
      [336.215426, 36, 202],
      [365.746277, 5, 702],
    ];
    const actual_full_moon = not_leap_year.full_moon_times();
    for (let i = 0; i < 12; i++) {
      expect(actual_full_moon[i][0]).toBeCloseTo(expected_full_moon[i][0]);
      expect(actual_full_moon[i][1]).toBe(expected_full_moon[i][1]);
      expect(actual_full_moon[i][2]).toBe(expected_full_moon[i][2]);
    }
  });

  it("compute new-moon and full-moon for a leap year", () => {
    const expected_new_moon: number[][] = [
      [6.04468085, 6, 42],
      [35.5755319, 35, 541],
      [65.1063830, 5, 100],
      [94.6372340, 34, 599],
      [124.1680851, 4, 158],
      [153.6989362, 33, 657],
      [183.2297872, 3, 216],
      [212.7606383, 32, 715],
      [242.2914894, 2, 274],
      [271.8223404, 31, 773],
      [301.3531915, 1, 332],
      [330.8840426, 30, 831],
      [360.4148936, 0, 390],
    ];
    const actual_new_moon = leap_year.new_moon_times();
    for (let i = 0; i < 12; i++) {
      expect(actual_new_moon[i][0]).toBeCloseTo(expected_new_moon[i][0]);
      expect(actual_new_moon[i][1]).toBe(expected_new_moon[i][1]);
      expect(actual_new_moon[i][2]).toBe(expected_new_moon[i][2]);
    }

    const expected_full_moon: number[][] = [
      [20.810106, 20, 762],
      [50.340957, 50, 321],
      [79.871809, 19, 820],
      [109.4026596, 49, 379],
      [138.9335106, 18, 878],
      [168.4643617, 48, 437],
      [197.9952128, 17, 936],
      [227.5260638, 47, 495],
      [257.0569149, 17, 54],
      [286.5877660, 46, 553],
      [316.1186170, 16, 112],
      [345.6494681, 45, 611],
      [375.1803191, 15, 170],
    ];
    const actual_full_moon = leap_year.full_moon_times();
    for (let i = 0; i < 12; i++) {
      expect(actual_full_moon[i][0]).toBeCloseTo(expected_full_moon[i][0]);
      expect(actual_full_moon[i][1]).toBe(expected_full_moon[i][1]);
      expect(actual_full_moon[i][2]).toBe(expected_full_moon[i][2]);
    }
  });

  it("set intercalary month", () => {
    expect(not_leap_year.intercalary_month_index()).toBe(0);
    expect(leap_year.intercalary_month_index()).toBe(10);

    const last_month_intercal: Year = new YinCalendar(-655).calculate();
    expect(last_month_intercal.intercalary_month_index()).toBe(12);

    const first_month_intercal: Year = new YinCalendar(-627).calculate();
    expect(first_month_intercal.intercalary_month_index()).toBe(1);

    const rule_3: Year = new YinCalendar(-348).calculate();
    expect(rule_3.intercalary_month_index()).toBe(8);

    const rule_6: Year = new YinCalendar(-345).calculate();
    expect(rule_6.intercalary_month_index()).toBe(5);

    const rule_9: Year = new YinCalendar(-342).calculate();
    expect(rule_9.intercalary_month_index()).toBe(2);

    const rule_11: Year = new YinCalendar(-340).calculate();
    expect(rule_11.intercalary_month_index()).toBe(11);

    const rule_14: Year = new YinCalendar(-337).calculate();
    expect(rule_14.intercalary_month_index()).toBe(7);

    const rule_17: Year = new YinCalendar(-334).calculate();
    expect(rule_17.intercalary_month_index()).toBe(3);

    const rule_19: Year = new YinCalendar(-332).calculate();
    expect(rule_19.intercalary_month_index()).toBe(12);
  });
})
