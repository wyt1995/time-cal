import React, {useState} from "react";
import Year from "../Cal/year";
import {SexagenaryCycle} from "../Cal/sexagenary-cycle";
import styles from "./Timeline.module.css";

function CalDisplayTimeline({data}: {data: Array<Year>}): React.ReactElement {
  const [hovered, setHovered] = useState<boolean>(false);
  const [tooltipInfo, setTooltipInfo] = useState<number[]>([]);
  const [tooltipPosition, setTooltipPosition] = useState({ x : 0, y : 0, dir: 0 });

  const lineLength = (year: Year): number => {
    return year.is_leap_year() ? 410 : 380;
  }

  const leftPosition = (year: Year): number => {
    return year.new_moon_times()[0][1] - 10;
  }

  const offset = (year: Year): boolean => {
    return year.new_moon_times()[0][0] > year.medial_qi_times()[0][0];
  }

  const getPosition = (time: number, maxPosition: number, leftPosition: number, offset: boolean): string => {
    if (offset) {
      return `${((time + 60 - leftPosition) / maxPosition) * 100}%`;
    }
    return `${((time - leftPosition) / maxPosition) * 100}%`;
  }

  const handleMouseEnter = (e: React.MouseEvent, time: ReadonlyArray<number>, position: 'above' | 'below') => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xCor = rect.left + rect.width / 2;
    const yCor = position === 'above' ? rect.top - 110 : rect.bottom + 10;
    const direction: number = position === 'above' ? 0 : 1;
    setHovered(true);
    setTooltipPosition({ x : xCor, y : yCor, dir: direction });
    setTooltipInfo([time[1], time[2]]);
  }

  const handleMouseLeave = () => {
    setHovered(false);
    setTooltipInfo([]);
  }

  return (
    <div className={styles.container}>

      <div className={styles.timeline} style={{height: `${data.length * 300}px`}}>
        {data.map((year: Year, index: number) => {
          const len: number = lineLength(year);
          const left: number = leftPosition(year);
          const off: boolean = offset(year);
          return (
            <div key={index} className={styles.yearStyle} style={{top: `${index * 300}px`}}>

              <div className={styles.lineLabel}>{year.get_calendar_name_ch()}</div>
              <div className={styles.line}></div>

              <span className={styles.eventLabel}>New Moon</span>
              {year.new_moon_times().map((arr: ReadonlyArray<number>, idx: number) => (
                <div key={`lunar-${idx}`}
                     className={styles.eventStyle}
                     style={{backgroundColor: '#0f60f1', left: `${getPosition(arr[0], len, left, false)}`, top: '150px'}}
                     onMouseEnter={(e) => handleMouseEnter(e, arr, 'above')}
                     onMouseLeave={handleMouseLeave}
                />
              ))}

              {year.medial_qi_times().map((arr: ReadonlyArray<number>, idx: number) => (
                <div key={`solar-${idx}`}
                     className={styles.eventStyle}
                     style={{backgroundColor: '#f1c40f', left: `${getPosition(arr[0], len, left, off)}`, top: '165px'}}
                     onMouseEnter={(e) => handleMouseEnter(e, arr, 'below')}
                     onMouseLeave={handleMouseLeave}
                />
              ))}
              <span className={styles.eventLabelDown}>Medial Qi</span>
            </div>
          );
        })}
      </div>

      {hovered && (
        <div className={`${styles.tooltip} ${tooltipPosition.dir ? styles.tooltipBelow : styles.tooltipAbove}`}
             style={{ left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px`, transform: 'translate(-50%, 0)' }}
        >
          <p><strong>Date:</strong> {`${SexagenaryCycle[tooltipInfo[0]].name_ch}  (${tooltipInfo[0].toString()})`}</p>
          <p><strong>Fraction:</strong> {tooltipInfo[1]}</p>
        </div>
      )}

    </div>
  );
}

export default CalDisplayTimeline;
