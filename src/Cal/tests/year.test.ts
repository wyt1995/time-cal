import Year from '../year';

describe('Year Class', () => {
  let testYear: Year;

  beforeEach(() => {
    testYear = new Year(-103, 0, "SanTong");
  });

  it('should correctly initialize the year_ce', () => {
    expect(testYear.get_year()).toBe(-103);
  });

  test('should correctly initialize the year_diff', () => {
    expect(testYear.years_from_origin()).toBe(0);
  });

  test('set high origin year', () => {
    testYear.set_high_origin(-143230);
    expect(testYear.years_from_origin()).toBe(143127);
  })
});
