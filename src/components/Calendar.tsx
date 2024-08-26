import React, {useState} from "react";
import CalSelector from "./CalSelector";
import ResultSection from "./ResultSection";
import styles from "./Calendar.module.css";

function Calendar(): React.ReactElement {
  const [yearStart, setYearStart] = useState<number>();
  const [yearEnd, setYearEnd] = useState<number>();
  const [selectedCalendars, setSelectedCalendars] = useState<Array<string>>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  return (
    <div className={styles.cal}>
      <h1>Chronological Table: A Reconstruction of Pre-modern Chinese Calendars</h1>
      <h2 lang='zh-cn' style={{'marginBottom': '32px'}}>中國古代曆法的氣朔推步</h2>

      <CalSelector yearStart={yearStart} setYearStart={setYearStart}
                   yearEnd={yearEnd} setYearEnd={setYearEnd}
                   selectedCalendars={selectedCalendars} setSelectedCalendars={setSelectedCalendars}
                   isSubmit={isSubmit} setIsSubmit={setIsSubmit}
      />

      {isSubmit && yearStart !== undefined && yearEnd !== undefined && (
        <ResultSection calendars={selectedCalendars}
                       years={[yearStart, yearEnd]}
        />
      )}
    </div>
  );
}

export default Calendar;
