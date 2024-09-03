import QuarterRemainder from "./quarter-remainder";

class YinCalendar extends QuarterRemainder {
  public constructor(year: number) {
    super(year, "Yin");
  }
}

export default YinCalendar;
