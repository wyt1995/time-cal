import React, {useState} from 'react';
import CalResultCtrl from "./CalResultCtrl";
import styles from './Calendar.module.css';

interface ResultProps {
  calendars: string[];
  years: number[];
}

function CalResult({ calendars, years }: ResultProps): React.ReactElement {
  const [displayView, setDisplayView] = useState<string>('table');
  const [displayYear, setDisplayYear] = useState<number>();
  const [entryNumber, setEntryNumber] = useState<number>(5);

  return (
    <div className={styles.resultSection}>
      <CalResultCtrl
        calendars={calendars}
        yearRange={years}
        onViewChange={setDisplayView}
        onYearChange={setDisplayYear}
        onEntryChange={setEntryNumber}
      />
    </div>
  );
}

export default CalResult;
