import React, {useEffect, useState, useRef} from 'react';

function SnippetCard({ snippet, onClick }) {
  const [fontSize, setFontSize] = useState(1.2)
  const textRef = useRef(null);
  const containerRef = useRef(null);

  if (!snippet) {
    console.error('No snippet data provided to SnippetCard');
    return <div>No snippet data available</div>;
  }

  const isOverflowing = (element) => {
    return element.scrollHeight > element.clientHeight;
  };

  const adjustFontSize = () => {
    const text = textRef.current;
    const container = containerRef.current;

    let currentSize = 1.2;
    text.style.fontSize = `${currentSize}rem`;

    while (isOverflowing(container) && currentSize > 0.7) {
      currentSize -= 0.05;
      text.style.fontSize = `${currentSize}rem`;
    }

    setFontSize(currentSize);
  }

  useEffect(() => {
    setTimeout(() => {
      adjustFontSize();
    }, 10);
  },[snippet]);

  return (
    <div
      className="card snippet-card shadow"
      onClick={onClick}
    >
      <div className="row h-100">
        <div className="col">
          <div className="card-body d-flex flex-column h-100">
            <div
              ref={containerRef}
              className="flex-grow-1"
              style={{
                height: "3.6rem",
                overflow: "hidden"
              }}
            >
              <p
                ref={textRef}
                className="card-text m-0"
                style={{
                  fontSize: `${fontSize}`,
                  lineHeight: "1.5",
                  // minHeight: '3.6rem',
                  // maxHeight: '20%',
                  // overflow: 'hidden',
                }}>
                {snippet.snippet}
              </p>
            </div>
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
