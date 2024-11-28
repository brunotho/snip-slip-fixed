import React from 'react';

function SnippetCard({ snippet, onClick }) {
  if (!snippet) {
    console.error('No snippet data provided to SnippetCard');
    return <div>No snippet data available</div>;
  }

  return (
    <div
      className="card shadow"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        height: '150px',
        width: '100%',
        maxWidth: '450px'
      }}
    >
      <div className="row h-100">
        <div className="col">
          <div className="card-body d-flex flex-column h-100">
            <p
              className="card-text flex-grow-1"
              style={{
                fontSize: '1.2rem',
                minHeight: '3.6rem',
                maxHeight: '20%',
                // overflow: 'hidden',
                // display: '-webkit-box',
                // WebkitLineClamp: '3',
                // WebkitBoxOrient: 'vertical',
                // textOverflow: 'ellipsis'
              }}>
              {snippet.snippet}
            </p>
            <div className="d-flex justify-content-between">
              <small className="text-muted align-self-end">
                Points: {snippet.difficulty}
              </small>
              <small className="text-muted align-self-end text-right">
                <div>{snippet.song}</div>
                <div>{snippet.artist}</div>
              </small>
            </div>
          </div>
        </div>
        <div className="col-auto h-100">
          <img
            src={snippet.image_url}
            alt={`${snippet.song} Album Cover`}
            style={{ height: '100%', objectFit: 'cover', borderRadius: '0 0.25rem 0.25rem 0' }}
            />
        </div>
      </div>
    </div>
  );
}

export default SnippetCard;
