import Calendar from "@/Cal/Calendar";
import Year from "@/Cal/year";
import YellowEmperor from "@/Cal/yellow-emperor";
import ZhuanXu from "@/Cal/zhuan-xu";
import XiaCalendar from "@/Cal/xia-calendar";
import YinCalendar from "@/Cal/yin-calendar";
import ZhouCalendar from "@/Cal/zhou-calendar";
import LuCalendar from "@/Cal/lu-calendar";
import TripleConcordance from "@/Cal/triple-concordance";
import EasternHan from "@/Cal/eastern-han";


class CalendarsManager {
  private calendar_map: { [key: string]: new (year: number) => Calendar } = {
    "HuangDi": YellowEmperor,
    "ZhuanXu": ZhuanXu,
    "Xia": XiaCalendar,
    "Yin": YinCalendar,
    "Zhou": ZhouCalendar,
    "Lu": LuCalendar,
    "SanTong": TripleConcordance,
    "SiFen": EasternHan,
  };

  private memo: Map<string, Year> = new Map();
  private memo_key(year: number, calendar: string): string {
    return `${year}-${calendar}`;
  }

  public compute_all(year: number, calendars: string[]): Year[] {
    const results: Year[] = [];

    for (const cal_string of calendars) {
      const key: string = this.memo_key(year, cal_string);
      if (this.memo.has(key)) {
        const cached = this.memo.get(key);
        if (cached) {
          results.push(cached);
        }
        continue;
      }

      const CalendarClass = this.calendar_map[cal_string];
      if (CalendarClass) {
        const cal: Calendar = new CalendarClass(year);
        const curr_year = cal.calculate();
        this.memo.set(key, curr_year);
        results.push(curr_year);
      }
    }

    return results;
  }
}

export default CalendarsManager;
