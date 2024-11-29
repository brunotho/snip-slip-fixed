import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function HeroSection({ onPlay }) {
  return (
    <div>
      <div
        className="jumbotron text-center d-flex flex-column justify-content-center"
        style={{ height: '20vh', marginTop: '7rem' }}
        >
        <h1 className="display-4">Welcome playa!</h1>
        <div
          className="mt-4"
          style={{ cursor: "pointer" }}
          onClick={onPlay}
          >
          <FontAwesomeIcon
            icon={faPlay}
            size="4x"
            style={{ color: "black" }}
            aria-label="Play"
            beat
            />
        </div>
      </div>
      <div className="rules-section d-flex justify-content-center">
        <div className="container d-flex flex-column align-items-center">
          <ul className="list-unstyled" style={{ marginTop: "4rem" }}>
            <div className="rules-container">
              <li className="basic-rule">Press Play</li>
            </div>
            <div className="rules-container">
              <li className="basic-rule">Pick your lyric snippet</li>
              <div className="extended-rule">Choose from famous song lyrics of varying difficulty</div>
            </div>
            <div className="rules-container">
              <li className="basic-rule">Slip it into conversation</li>
              <div className="extended-rule">Make it sound natural in real life conversation with friends</div>
            </div>
            <div className="rules-container">
              <li className="basic-rule">Don't get caught!</li>
              <div className="extended-rule">Others shouldn't notice you are quoting or "saying something weird"</div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
