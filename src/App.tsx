import React, { useState } from 'react';
import Header from './components/Header';
import './index.css';
import './App.css';

function App(): React.ReactElement {
  const title: string = 'Time in Calculation'
  const tabTitles: string[] = ['Home', 'Chronology', 'Eclipse', 'Time'];
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  }

  return (
    <>
      <Header title={title} tabs={tabTitles} activeTab={activeTab} onTabClick={handleTabClick} />
    </>
  );
}

export default App;
