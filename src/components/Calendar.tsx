import React, { useState } from "react";
import { CalendarsInfo } from "../Cal/calendar-info";
import styles from "./Calendar.module.css";

function Calendar(): React.ReactElement {
  const [calendarOptions] = useState<string[]>(CalendarsInfo.map((c) => c.name_ch));
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);
  const [selectInput, setSelectInput] = useState<string>('');
  const [isDropDown, setIsDropDown] = useState<boolean>(false);

  const [yearStart, setYearStart] = useState<string>('');
  const [yearEnd, setYearEnd] = useState<string>('');

  // Calendars selection
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectInput(e.target.value);
    setIsDropDown(!isDropDown);
  }

  const handleOptionClick = (option: string): void => {
    if (!selectedCalendars.includes(option)) {
      setSelectedCalendars([...selectedCalendars, option]);
    }
    setSelectInput('');
    setIsDropDown(false);
  }

  const handleRemoveOption = (option: string): void => {
    setSelectedCalendars(selectedCalendars.filter((c) => c !== option));
  }

  return (
    <div className={styles.cal}>
      <h1>Chronological Table: A Reconstruction of Pre-modern Chinese Calendars</h1>
      <h2 lang='zh-cn'>中國古代曆法的氣朔推步</h2>
    </div>
  );
}

export default Calendar;
