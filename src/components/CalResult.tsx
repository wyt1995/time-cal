import React, {useState} from 'react';
import CalResultCtrl from "./CalResultCtrl";
import CalResultDisplay from "./CalResultDisplay";
import styles from './Calendar.module.css';

interface ResultProps {
  calendars: string[];
  years: number[];
}

function CalResult({calendars, years}: ResultProps): React.ReactElement {
  const [displayView, setDisplayView] = useState<string>('table');
  const [displayYear, setDisplayYear] = useState<number>(years[0]);
  const [entryNumber, setEntryNumber] = useState<number>(1);

  return (
    <div className={styles.resultSection}>
      <CalResultCtrl
        calendars={calendars}
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
      />
    </div>
  );
}

export default CalResult;
