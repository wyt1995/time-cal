import React from 'react';
import Year from "@/Cal/year";
import CalendarsManager from "@/Cal/calendars-manager";
import CalDisplayTable from "@/components/CalDisplayTable";
import CalDisplayTimeline from "@/components/CalDisplayTimeline";

interface CalResultDisplayProps {
  calendars: string[],
  yearRange: number[],
  displayView: string,
  displayYear: number,
  entryNumber: number,
}

function CalResultDisplay(props: CalResultDisplayProps): React.ReactElement {
  const {calendars, yearRange, displayView, displayYear, entryNumber} = props;
  const [yearStart, yearEnd] = yearRange;

  let displayEntry: number = entryNumber;
  if (displayView === 'timeline') {
    displayEntry = 1;
  }

  const manager = new CalendarsManager()
  const results: Array<Year> = [];
  for (let y = displayYear; y < displayYear + displayEntry && y <= yearEnd; y += 1) {
    if (y === 0) {
      continue;
    }
    if (y < 0) {
      y += 1;
    }
    const result_per_year = manager.compute_all(y, calendars);
    results.push(...result_per_year);
  }

  const checkRep = () => {
    if (displayYear < yearStart || displayYear > yearEnd) {
      console.error("Year number is out of range");
    }
    if (results === null || results === undefined) {
      console.error("No result is returned");
    }
  }
  checkRep();

  if (displayView === "table") {
    return <CalDisplayTable data={results} />;
  } else {
    return <CalDisplayTimeline data={results} />;
  }
}

export default CalResultDisplay;
