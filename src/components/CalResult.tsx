import React, {useState, useEffect, useMemo} from 'react';
import CalendarsManager from "../Cal/calendars-manager";
import CalResultCtrl from "./CalResultCtrl";
import CalResultDisplay from "./CalResultDisplay";
import styles from './Calendar.module.css';

interface ResultProps {
  calendars: string[];
  years: number[];
}

function CalResult({calendars, years}: ResultProps): React.ReactElement {
  const [yearStart, yearEnd] = years;
  const [displayView, setDisplayView] = useState<string>('table');
  const [displayYear, setDisplayYear] = useState<number>(yearStart);
  const [entryNumber, setEntryNumber] = useState<number>(1);

  // create calendar manager only once
  const manager = useMemo(() => new CalendarsManager(), []);

  useEffect(() => {
    setDisplayYear(yearStart);
  }, [yearStart, yearEnd]);

  return (
    <div className={styles.resultSection}>
      <CalResultCtrl
        yearRange={years}
        onViewChange={setDisplayView}
        onYearChange={setDisplayYear}
        onEntryChange={setEntryNumber}
      />

      <CalResultDisplay
        calendars={calendars}
        yearRange={years}
        displayView={displayView}
        displayYear={displayYear}
        entryNumber={entryNumber}
        manager={manager}
      />
    </div>
  );
}

export default CalResult;
