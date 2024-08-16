import React from "react";
import Intro from "./Intro";
import Calendar from "./Calendar";
import Eclipse from "./Eclipse";
import TimeTools from "./TimeTools";
import Error from "./Error";

interface MainSectionProps {
  activeTab: string;
}

function MainSection({ activeTab }: MainSectionProps): React.ReactElement {
  const renderTabContent = () => {
    switch (activeTab.toLowerCase()) {
      case '':
        return <Intro />
      case 'calendar':
        return <Calendar />
      case 'eclipse':
        return <Eclipse />
      case 'time':
        return <TimeTools />
      default:
        return <Error />
    }
  }

  return (
    <main>
      {renderTabContent()}
    </main>
  );
}

export default MainSection;
