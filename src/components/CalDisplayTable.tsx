import React, {useState} from "react";
import Year from "../Cal/year";
import TimeTable from "./TimeTable";
import styles from "./Calendar.module.css";

function CalDisplayTable({data}: {data: Array<Year>}): React.ReactElement {
  const [showNumber, setShowNumber] = useState<boolean>(false);
  const [showFraction, setShowFraction] = useState<boolean>(true);

  return (
    <>
      <div className={styles.switchContainer}>
        <div  className={styles.switchLabel}>
          <label>Show Numbers</label>
          <label className={styles.switch}>
            <input type="checkbox" checked={showNumber} onChange={() => setShowNumber(!showNumber)} />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.switchLabel}>
          <label className={styles.switch}>
            <input type="checkbox" checked={showFraction} onChange={() => setShowFraction(!showFraction)}/>
            <span className={styles.slider}></span>
          </label>
          <label>Show Fractions</label>
        </div>
      </div>

      {data.map((yearData, index) => (
          <React.Fragment key={index}>
            <TimeTable yearData={yearData} showNumber={showNumber} showFraction={showFraction}/>
            {index < data.length - 1 && <hr style={{border: '1px solid gray'}}/>}
          </React.Fragment>
        )
      )}
    </>
  );
}

export default CalDisplayTable;
