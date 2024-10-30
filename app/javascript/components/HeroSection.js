import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function HeroSection({ onPlay }) {
  return (
    <div
      className="jumbotron text-center d-flex flex-column justify-content-center"
      style={{ height: '20vh', marginTop: '100px', marginBottom: '50px' }}
    >
      <h1 className="display-4">Welcome playa!</h1>
      <p className="lead">Try to sneak in song lyrics into your conversations.</p>
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
  );
}

export default HeroSection;
