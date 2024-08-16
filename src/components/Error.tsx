import React from 'react';
import styles from './Calendar.module.css'

function Error(): React.ReactElement {
  return (
    <h1 className={styles.cal}>
      The requested URL does not exist
    </h1>
  )
}

export default Error;
