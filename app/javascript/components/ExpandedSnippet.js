import React from 'react';
import '../stylesheets/_button_styles.scss'

function ExpandedSnippet({ snippet, onSubmit, game_session_id, onNext }) {
  const handleSuccess = () => {
    onSubmit(snippet.id, true);
  };

  const handleFailure = () => {
    onSubmit(snippet.id, false);
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <div
      className="card mb-4"
      style={{ height: '65vh', width: "80%", overflow: 'hidden' }}
    >
      <div className="row no-gutters h-100">
        <div className="col d-flex flex-column h-100">
          <div className="card-body flex-grow-1 overflow-auto">
            <p className="card-text" style={{ fontSize: '1.5rem' }}>
              {snippet.snippet}
            </p>
          </div>
          <div className="result-button-container p-2" style={{ flexShrink: 0 }}>
            {game_session_id ? (
              <>
                <button className="button-fancy button-fancy-success" onClick={handleSuccess}>
                  :)
                </button>
                <button className="button-fancy button-fancy-fail" onClick={handleFailure}>
                  :(
                </button>
              </>
            ) : (
              <button className="button-fancy" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>

{/* right side */}
        <div
          className="col-auto d-flex flex-column h-100"
          style={{ overflow: 'hidden' }}
        >
          <div style={{ flexShrink: 0 }}>
            <img
              src="https://i.scdn.co/image/ab67616d0000b273a6f439c8957170652f9410e2"
              alt={`${snippet.song} Album Cover`}
              style={{
                maxHeight: '50vh',
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
          <div className="flex-grow-1"></div>
          <div className="text-right p-2" style={{ flexShrink: 0 }}>
            <p className="mb-1">{snippet.song}</p>
            <p className="mb-1">{snippet.artist}</p>
            <p className="mb-1">Points: {snippet.difficulty}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpandedSnippet;
