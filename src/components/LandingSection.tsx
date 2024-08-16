import React from 'react';
import '../App.css';

function LandingSection(): React.ReactElement {
  return (
    <section className="landing">
      <img
        src="/frontpage-img.webp"
        alt="frontpage image"
        className="landing-image"
      />
    </section>
  );
}

export default LandingSection;
