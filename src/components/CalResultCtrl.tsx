import React, {useState} from 'react';
import {ChevronLeft, ChevronRight, Table} from 'lucide-react';
import styles from './Calendar.module.css';

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
  const [entries, setEntries] = useState(10);

  const handleViewChange = (newView: 'table' | 'timeline') => {
    setView(newView);
    onViewChange(newView);
  };

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    onYearChange(newYear);
  };

  const handleEntriesChange = (newEntries: number) => {
    setEntries(newEntries);
    onEntryChange(newEntries);
  };

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
        <select
          value={year}
          onChange={(e) => handleYearChange(Number(e.target.value))}
          className={styles.yearSelect}
        >
          {Array.from(
            { length: yearRange[1] - yearRange[0] + 1 },
            (_, i) => yearRange[0] + i
          ).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
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
          <label htmlFor="entries" className="entries-label">
            Entries per page:
          </label>
          <select
            id="entries"
            value={entries}
            onChange={(e) => handleEntriesChange(Number(e.target.value))}
            className="entries-select"
          >
            {[5, 10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default CalResultCtrl;
