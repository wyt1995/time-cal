import React from 'react';

interface ResultProps {
  calendars: string[];
  years: number[];
}

function ResultSection({ calendars, years }: ResultProps): React.ReactElement {
  console.log(calendars);
  console.log(years);
  return (
    <div></div>
  );
}

export default ResultSection;
