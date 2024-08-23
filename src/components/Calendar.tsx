import React, { useState, useEffect, useRef } from "react";
import ResultSection from "./ResultSection";
import { CalendarInfo, CalendarsInfo } from "../Cal/calendar-info";
import styles from "./Calendar.module.css";

function Calendar(): React.ReactElement {
  const [yearStart, setYearStart] = useState<number>();
  const [yearEnd, setYearEnd] = useState<number>();
  const [calendarOptions] = useState<Array<CalendarInfo>>(CalendarsInfo);
  const [selectedCalendars, setSelectedCalendars] = useState<Array<string>>([]);
  const [selectInput, setSelectInput] = useState<string>('');
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLUListElement | null>(null);
  const selectedRef = useRef<HTMLDivElement | null>(null);
  const submitButtonRef = useRef<HTMLDivElement | null>(null);

  // calendars selection
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectInput(event.target.value);
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

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLUListElement>): void => {
    if (!dropDownRef.current?.contains(event.relatedTarget)) {
      setIsDropDown(false);
    }
  }

  // adjust webpage layout
  useEffect(() => {
    adjustPosition();
  }, [selectedCalendars]);

  const adjustPosition = (): void => {
    if (selectedRef.current && submitButtonRef.current) {
      const height = selectedRef.current.offsetHeight;
      submitButtonRef.current.style.marginTop = `${height + 16}px`;
    }
  }

  // check variables before submission
  const checkRep = (): void => {
    if (selectedCalendars.length === 0) {
      alert("Please select at least one calendar");
      return;
    }
  }

  // button click
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    checkRep();
    setIsSubmit(true);
  }

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setSelectedCalendars([]);
    setYearStart(undefined);
    setYearEnd(undefined);
    setIsSubmit(false);
  }

  return (
    <div className={styles.cal}>
      <h1>Chronological Table: A Reconstruction of Pre-modern Chinese Calendars</h1>
      <h2 lang='zh-cn' style={{'marginBottom': '32px'}}>中國古代曆法的氣朔推步</h2>

      <div className={styles.inputContainer}>
        <div className={styles.formField}>
          <label htmlFor="year-start">Years</label>
          <div className={styles.yearsWrapper}>
            <input id="year-start" type="number" value={yearStart ?? ''} placeholder="From"
                   onChange={(e) => setYearStart(e.target.valueAsNumber)} />
            <span>——</span>
            <input id="year-end" type="number" value={yearEnd ?? ''} placeholder="To"
                   onChange={(e) => setYearEnd(e.target.valueAsNumber)} />
          </div>
        </div>

        <div className={styles.formField}>
        <label htmlFor="multi-select-input">Calendars</label>
          <input id="multi-select-input"
                 type="text"
                 value={selectInput}
                 placeholder="Click to select from options …"
                 onChange={handleInputChange}
                 onClick={() => setIsDropDown(!isDropDown)}
                 onBlur={handleBlur}
          />
          {isDropDown && (
            <ul ref={dropDownRef} onBlur={handleBlur} tabIndex={-1}>
              {calendarOptions
                .filter((cal: CalendarInfo) =>
                  !selectedCalendars.includes(cal.name)
                  && (cal.name.toLowerCase().includes(selectInput.toLowerCase())
                    || cal.name_ch.includes(selectInput)))
                .map((cal) => (
                  <li lang="zh-cn" key={cal.name} onClick={() => handleOptionClick(cal.name)}>{cal.name_ch}</li>
                ))
              }
            </ul>
          )}
          <div className={styles.selectedContainer} ref={selectedRef} >
            {selectedCalendars.map((option: string) => (
              <div key={option} className={styles.selected}>
                {calendarOptions.find(cal => cal.name === option)?.name_ch}
                <span onClick={() => handleRemoveOption(option)}>×</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={submitButtonRef} style={{textAlign: 'center'}}>
          <button type="submit" className={styles.submitBtn} onClick={handleSubmit}>
            Submit
          </button>

          <button type="submit" className={styles.submitBtn} onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      {isSubmit && yearStart !== undefined && yearEnd !== undefined && (
        <ResultSection calendars={selectedCalendars} years={[yearStart, yearEnd]} />
      )}
    </div>
  );
}

export default Calendar;
