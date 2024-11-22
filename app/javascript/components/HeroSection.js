import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function HeroSection({ onPlay }) {
  return (
    <div>
      <div
        className="jumbotron text-center d-flex flex-column justify-content-center"
        style={{ height: '20vh', marginTop: '80px', marginBottom: '50px' }}
        >
        <h1 className="display-4">Welcome playa!</h1>
        {/* <p className="lead">Press play</p> */}
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
      <div className="d-flex justify-content-center">
        <div className="container d-flex flex-column align-items-center">
          <div className="mt-4">
            <ul className="list-unstyled">
              <li>Press Play</li>
              <li>Pick your lyric snippet</li>
              <li>Slip it into conversation</li>
              <li>Don't get caught!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
