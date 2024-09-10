import React, {useState, useRef} from 'react';
import {ChevronLeft, ChevronRight, Minus, Plus} from 'lucide-react';
import styles from './CalResultCtrl.module.css';

interface CalResultCtrlProps {
  calendars: string[],
  yearRange: number[],
  onViewChange: (view: 'table' | 'timeline') => void;
  onYearChange: (year: number) => void;
  onEntryChange: (count: number) => void;
}

function CalResultCtrl(props: CalResultCtrlProps): React.ReactElement {
  const {calendars, yearRange, onViewChange, onYearChange, onEntryChange} = props;
  const [yearStart, yearEnd] = yearRange;

  const [view, setView] = useState<'table' | 'timeline'>('table');
  const [year, setYear] = useState<number>(yearStart);
  const [entries, setEntries] = useState<number>(1);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(Math.abs(year).toString() + ` ${year < 0 ? 'BCE': 'CE'}`);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const yearFormat = (num: number): string => {
    return Math.abs(num).toString() + ` ${year < 0 ? 'BCE': 'CE'}`
  }

  const handleViewChange = (newView: 'table' | 'timeline'): void => {
    setView(newView);
    onViewChange(newView);
  };

  const handleYearChange = (newYear: number): void => {
    if (newYear < yearStart || newYear === 0 || newYear > yearEnd) {
      return;
    }
    setYear(newYear);
    setInputValue(yearFormat(newYear));
    setIsDropdown(false);
    onYearChange(newYear);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    setIsDropdown(true);
  }

  const handleInputBlur = (event: React.FocusEvent): void => {
    if (!dropdownRef.current?.contains(event.relatedTarget)) {
      setIsDropdown(false);
    }
  }

  const handleEntriesChange = (newEntries: number) => {
    setEntries(newEntries);
    onEntryChange(newEntries);
  };

  const yearOptions = Array.from(
    { length: yearRange[1] - yearRange[0] + 1 },
    (_, i) => yearRange[0] + i
  );

  const filteredYears = yearOptions.filter(y => {
    const inputNumber = inputValue.replace(/[^0-9]/g, "");
    return y !== 0 && (inputNumber === year.toString() || y.toString().includes(inputNumber));
  });

  return (
    <div className={styles.resultControls}>
      <div className={styles.viewToggle}>
        <span className={`${styles.slider} ${view === 'table' ? styles.slideLeft : styles.slideRight}`} />
        <button
          onClick={() => handleViewChange('table')}
          className={`${styles.viewButton} ${view === 'table' ? styles.active : ''}`}
        >
          Table
        </button>

        <button
          onClick={() => handleViewChange('timeline')}
          className={`${styles.viewButton} ${view === 'timeline' ? styles.active : ''}`}
        >
          Timeline
        </button>
      </div>

      <div className={styles.yearSelector}>
        <button
          onClick={() => handleYearChange(Math.max(year - 1, yearRange[0]))}
          className={styles.yearButton}
          disabled={year <= yearRange[0]}
        >
          <ChevronLeft size={20} />
        </button>

        <div className={styles.yearInput}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsDropdown(true)}
            onBlur={handleInputBlur}
          />
          {isDropdown && filteredYears.length > 0 && (
            <ul className={styles.yearDropDown} ref={dropdownRef}>
              {filteredYears.map(y => (
                <li key={y} onMouseDown={() => handleYearChange(y)}>
                  {yearFormat(y)}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={() => handleYearChange(Math.min(year + 1, yearRange[1]))}
          className={styles.yearButton}
          disabled={year >= yearRange[1]}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {view === 'table' && (
        <div className={styles.entriesSelector}>
          <button
            onClick={() => handleEntriesChange(Math.max(1, entries - 1))}
            className={styles.entriesButton}
            disabled={entries <= 1}
          >
            <Minus size={18} />
          </button>
          <span className={styles.entriesCount}>{entries}</span>
          <button
            onClick={() => handleEntriesChange(Math.min(10, yearEnd - yearStart + 1, entries + 1))}
            className={styles.entriesButton}
            disabled={entries >= Math.min(10, yearEnd - yearStart + 1)}
          >
            <Plus size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default CalResultCtrl;
