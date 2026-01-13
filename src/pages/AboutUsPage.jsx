import React from 'react';
import './AboutUsPage.css';

const AboutUsPage = () => {
  return (
    <div className="about-us-container">
      {/* Header Section */}
      <section className="about-header">
        <h1>About Hanzheng Club</h1>
        <p className="about-tagline">Innovate. Collaborate. Excel.</p>
      </section>

      {/* Our Story Section */}
      <section className="about-section story-section">
        <h2>Our Story</h2>
        <div className="section-content">
          <p>
            Founded in October 2024, Hanzheng Club began with a small group of students driven by a shared passion for technology and a desire to go beyond the classroom curriculum.
            What started as late-night coding sessions and "Neijuan" (seeking excellence through competition) quickly grew into a community.
          </p>
          <p>
            We realized that by pooling our knowledge and pushing each other to do better, we could achieve far more than we could alone.
            Today, we are a thriving club dedicated to fostering the next generation of tech leaders.
          </p>
        </div>
      </section>


    </div>
  );
};

export default AboutUsPage;