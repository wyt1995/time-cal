import React, {useMemo} from "react";
import DataTable from "react-data-table-component";
import Year from "../Cal/year";
import {SexagenaryCycle} from "../Cal/sexagenary-cycle";
import styles from "./Calendar.module.css";

interface TimeTableProps {
  yearData: Year,
  showNumber: boolean,
  showFraction: boolean,
}

function TimeTable({yearData, showNumber, showFraction}: TimeTableProps): React.ReactElement {
  const months: string[] = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth',
    'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth'];

  const monthLabels: string[] = useMemo(() => {
    const labels: string[] = [...months];
    const intercal: number = yearData.intercalary_month_index();
    if (intercal !== 0) {
      labels.splice(intercal, 0, 'Intercalary');
    }
    return labels;
  }, [yearData]);

  const yearNumber: number = yearData.get_year();
  const title: string = yearNumber < 0 ? `${-yearNumber + 1} BCE` : `${yearNumber} CE`;

  // header row
  const columns = useMemo(() => [
    {
      name: "Months",
      sortable: false,
      style: {fontWeight: 'bold'},
      cell: (row: any) => row.event,
    },

    ...monthLabels.map((label: string, index: number) => ({
      name: label,
      sortable: false,
      cell: (row: any) => {
        const content = row[`month-${index}`];
        if (content && content.firstLine) {
          return (
            <div>
              {content.firstLine}
              {content.secondLine && (
                <>
                  <br/>
                  <span style={{fontSize: "smaller"}}>{content.secondLine}</span>
                </>
              )}
            </div>
          );
        } else {
          return <div>{content}</div>;
        }
      }
    })),
  ], [monthLabels]);

  // data contents
  const tableData = useMemo(() => {
    const result = [];

    const newMoon: ReadonlyArray<ReadonlyArray<number>> = yearData.new_moon_times();
    const fullMoon: ReadonlyArray<ReadonlyArray<number>> = yearData.full_moon_times();
    const medial: ReadonlyArray<ReadonlyArray<number>> = yearData.medial_qi_times();
    const nodal: ReadonlyArray<ReadonlyArray<number>> = yearData.nodal_qi_times();

    const buildRow = (rowName: string, times: ReadonlyArray<ReadonlyArray<number>>, skipIntercal: boolean) => {
      const row: any = {event: rowName};
      let entryIndex: number = 0;
      monthLabels.forEach((label: string, index: number) => {
        if (label === "Intercalary" && skipIntercal) {
          row[`month-${index}`] = "";
        } else {
          const rowData: ReadonlyArray<number> = times[entryIndex];
          if (label === "Intercalary" && skipIntercal) {
            row[`month-${index}`] = "";
          } else {
            const greatRemainder: number = rowData[1];
            const lessRemainder: number = rowData[2];
            const cycleName: string = SexagenaryCycle[greatRemainder].name_ch;
            const firstLine: string = cycleName + `${showNumber ? ` (${greatRemainder + 1})` : ""}`;
            const secondLine: string = showFraction ? lessRemainder.toString() : "";
            row[`month-${index}`] = {
              firstLine: firstLine,
              secondLine: secondLine,
            };
          }
          entryIndex += 1;
        }
      });
      return row;
    }

    result.push(buildRow("New Moon", newMoon, false));
    result.push(buildRow("Full Moon", fullMoon, false));
    result.push(buildRow("Medial Qi", medial, true));
    result.push(buildRow("Nodal Qi", nodal, true));
    return result;
  }, [yearData, monthLabels, showNumber, showFraction]);

  const customStyles = {
    headCells: {
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        justifyContent: 'center',
        borderBottom: '0.5px solid #ccc',
        borderRight: '0.5px solid #ccc',
      },
    },
    cells: {
      style: {
        fontSize: '16px',
        justifyContent: 'center',
        padding: '0.5em',
        lineHeight: '24px',
        borderRight: '0.5px solid #ccc',
      },
    },
    rows: {
      style: {
        minHeight: '40px',
      },
    },
    table: {
      style: {
        border: '1px solid #ddd',
        borderRadius: '4px',
      },
    },
  }

  return (
    <div className={styles.resultTable} >
      <h3>{title}</h3>
      <DataTable
        columns={columns}
        data={tableData}
        highlightOnHover={true}
        striped={true}
        dense={false}
        customStyles={customStyles}
      />
    </div>
  );
}

export default TimeTable;
