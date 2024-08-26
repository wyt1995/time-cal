import React, {useEffect, useRef, useState} from 'react';
import styles from "./Calendar.module.css";
import {CalendarInfo, CalendarsInfo} from "../Cal/calendar-info";

interface CalSelectorProps {
  yearStart: number | undefined;
  setYearStart: (year: number | undefined) => void;
  yearEnd: number | undefined;
  setYearEnd: (year: number | undefined) => void;
  selectedCalendars: Array<string>;
  setSelectedCalendars: (selectedCalendars: Array<string>) => void;
  isSubmit: boolean;
  setIsSubmit: (isSubmit: boolean) => void;
}

function CalSelector(props: CalSelectorProps): React.ReactElement {
  const {
    yearStart, setYearStart,
    yearEnd, setYearEnd,
    selectedCalendars, setSelectedCalendars,
    isSubmit, setIsSubmit,
  } = props;

  const [calendarOptions] = useState<Array<CalendarInfo>>(CalendarsInfo);
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
  const checkRep = (): void => {
    if (selectedCalendars.length === 0) {
      alert("Please select at least one calendar");
      return;
    }
    if (yearStart === null || yearStart === undefined) {
      alert("Please set at least one year");
      return;
    }
    if (yearEnd === null || yearEnd === undefined || isNaN(Number(yearEnd))) {
      setYearEnd(yearStart);
    }
    if (isNaN(yearStart) || (yearEnd && isNaN(yearEnd))) {
      alert("Illegal input format\n\nThe years input must be one or two integers");
      return;
    }
    if (yearEnd && yearStart > yearEnd) {
      alert("The start year cannot be greater than the end year");
      return;
    }
    if (yearStart === 0 || yearEnd === 0) {
      alert(
        "Year zero is not supported\n\nWhy?\n\n" +
        "The short answer is, there was no year zero. In common uses, the year 1 BC is followed directly by AD 1.\n\n" +
        "Though in astronomical reckoning, the year 1 (unlabelled) is preceded by year 0, and that in turn by −1, " +
        "corresponding to 2 BC, and so on. For the ease of users, we only support the Anno Domini calendar year system."
      );
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
    <div className={styles.inputContainer}>
      <div className={styles.formField}>
        <label htmlFor="year-start">Years</label>
        <div className={styles.yearsWrapper}>
          <input id="year-start" type="number" value={yearStart ?? ''} placeholder="From"
                 onChange={(e) => setYearStart(e.target.value === '' ? undefined : e.target.valueAsNumber)}/>
          <span>——</span>
          <input id="year-end" type="number" value={yearEnd ?? ''} placeholder="To (optional)"
                 onChange={(e) => setYearEnd(e.target.value === '' ? undefined : e.target.valueAsNumber)}/>
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
                <li lang="zh-cn" key={cal.name} onClick={() => handleOptionClick(cal.name)}>
                  {cal.name_ch}
                </li>
              ))
            }
          </ul>
        )}

        <div className={styles.selectedContainer} ref={selectedRef}>
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
  )
}

export default CalSelector;
