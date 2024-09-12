import React, {useState} from "react";
import CalSelector from "./CalSelector";
import CalResult from "./CalResult";
import styles from "./Calendar.module.css";

function Calendar(): React.ReactElement {
  const [years, setYears] = useState<Array<number>>([]);
  const [calendars, setCalendars] = useState<Array<string>>([]);
  const resultKey = `${years.join('-')}, ${calendars.join('-')}`;

  return (
    <div className={styles.cal}>
      <h1>Chronological Table: A Reconstruction of Pre-modern Chinese Calendars</h1>
      <h2 lang='zh-cn' style={{'marginBottom': '32px'}}>中國古代曆法的氣朔推步</h2>

      <CalSelector setSubmittedYears={setYears} setSubmittedCalendars={setCalendars} />

      {years.length > 0 && calendars.length > 0 && (
        <CalResult key={resultKey} calendars={calendars} years={years} />
      )}
    </div>
  );
}

export default Calendar;
