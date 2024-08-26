import React, {useEffect, useRef, useState} from 'react';
import styles from "./Calendar.module.css";
import {CalendarInfo, CalendarsInfo} from "../Cal/calendar-info";

interface CalSelectorProps {
  setSubmittedYears: (submittedYears: number[]) => void;
  setSubmittedCalendars: (submittedCalendars: string[]) => void;
}

function CalSelector({setSubmittedYears, setSubmittedCalendars}: CalSelectorProps): React.ReactElement {
  const [yearStart, setYearStart] = useState<number>();
  const [yearEnd, setYearEnd] = useState<number>();
  const [calendarOptions] = useState<Array<CalendarInfo>>(CalendarsInfo);
  const [selectedCalendars, setSelectedCalendars] = useState<Array<string>>([]);

  const [selectInput, setSelectInput] = useState<string>('');
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLUListElement | null>(null);
  const selectedRef = useRef<HTMLDivElement | null>(null);
  const submitButtonRef = useRef<HTMLDivElement | null>(null);

  // calendar selection
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

  // collapse drop-down when calendar input is blurred
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
  const checkRep = (): boolean => {
    if (selectedCalendars.length === 0) {
      alert("Please select at least one calendar");
      return false;
    }
    if (yearStart === undefined || isNaN(Number(yearStart))) {
      alert("Please set a valid start year");
      return false;
    }
    if (yearEnd !== undefined && isNaN(Number(yearEnd))) {
      alert("Please set a valid end year");
      return false;
    }
    if (yearEnd !== undefined && yearStart > yearEnd) {
      alert("The start year cannot be greater than the end year");
      return false;
    }
    if (yearStart === 0 || (yearEnd !== undefined && yearEnd === 0)) {
      alert(
        "Year zero is not supported\n\nWhy?\n\n" +
        "The short answer is, there was no year zero. In common uses, the year 1 BC is followed directly by AD 1.\n\n" +
        "Though in astronomical reckoning, the year 1 (unlabelled) is preceded by year 0, and that in turn by −1, " +
        "corresponding to 2 BC, and so on. For the ease of users, we only support the Anno Domini calendar year system."
      );
      return false;
    }
    return true;
  }

  // button click
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (checkRep() && yearStart) {
      const submitYears: number[] = [yearStart, yearEnd ?? yearStart];
      setSubmittedYears(submitYears);
      setSubmittedCalendars(selectedCalendars);
    }
  }

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setSelectedCalendars([]);
    setYearStart(undefined);
    setYearEnd(undefined);
  }

  return (
    <div className={styles.inputContainer}>
      <div className={styles.formField}>
        <label htmlFor="select-year-start">Years</label>
        <div className={styles.yearsWrapper}>
          <input id="select-year-start"
                 type="number"
                 value={yearStart ?? ''}
                 placeholder="From"
                 onChange={(e) => setYearStart(e.target.value === '' ? undefined : e.target.valueAsNumber)}
          />
          <span>——</span>
          <input id="select-year-end"
                 type="number"
                 value={yearEnd ?? ''}
                 placeholder="To (optional)"
                 onChange={(e) => setYearEnd(e.target.value === '' ? undefined : e.target.valueAsNumber)}
          />
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
                !selectedCalendars.includes(cal.name) &&
                (selectInput.trim() === '' ||
                  cal.name.toLowerCase().includes(selectInput.toLowerCase()) ||
                  cal.name_ch.includes(selectInput.toLowerCase()))
              )
              .map((cal: CalendarInfo) => (
                <li lang="zh-cn" key={cal.name} onClick={() => handleOptionClick(cal.name)}>
                  {cal.name_ch}
                </li>
              ))
            }
          </ul>
        )}

        <div className={styles.selectedContainer} ref={selectedRef}>
          {selectedCalendars.map((option: string) => (
            <div lang="zh-cn" key={option} className={styles.selected}>
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
  )
}

export default CalSelector;
