import React, {useState} from "react";
import CalSelector from "./CalSelector";
import ResultSection from "./ResultSection";
import {CalendarInfo, CalendarsInfo} from "../Cal/calendar-info";
import styles from "./Calendar.module.css";

function Calendar(): React.ReactElement {
  const [yearStart, setYearStart] = useState<number>();
  const [yearEnd, setYearEnd] = useState<number>();
  const [calendarOptions] = useState<Array<CalendarInfo>>(CalendarsInfo);
  const [selectedCalendars, setSelectedCalendars] = useState<Array<string>>([]);
  const [selectInput, setSelectInput] = useState<string>('');
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  return (
    <div className={styles.cal}>
      <h1>Chronological Table: A Reconstruction of Pre-modern Chinese Calendars</h1>
      <h2 lang='zh-cn' style={{'marginBottom': '32px'}}>中國古代曆法的氣朔推步</h2>

      <CalSelector yearStart={yearStart} setYearStart={setYearStart}
                   yearEnd={yearEnd} setYearEnd={setYearEnd}
                   calendarOptions={calendarOptions}
                   selectedCalendars={selectedCalendars} setSelectedCalendars={setSelectedCalendars}
                   selectInput={selectInput} setSelectInput={setSelectInput}
                   isDropDown={isDropDown} setIsDropDown={setIsDropDown}
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
