import React from "react";
import PropTypes from "prop-types";

const GameLayout = ({
  mainContent,
  sideContent = null,
  showSidePanel = true,
  gameOver = false
}) => {
  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-md-2">
          {/* empty left column space */}
        </div>
        <div
          className={`col-md-8 mx-auto`}
          style={{
            // maxWidth: '65vw',
            // paddingLeft: '2rem',
            // paddingRight: '2rem',
          }}        >
          <div
            className={`d-flex justify-content-center ${!gameOver ? 'align-items-center' : ''}`}
            style={{
              // height: '80vh',
              overflow: 'hidden',
              marginTop: '0',
              paddingTop: '1rem'
            }}
          >
            {mainContent}
          </div>
        </div>
        {showSidePanel && (
          <div
            className="col-md-2"
            style={{
              // height: '80vh',
              overflowY: 'auto',
              overflowX: 'hidden',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              marginTop: '1rem'
            }}
          >
            {sideContent}
          </div>
        )}
      </div>
    </div>
  );
};

GameLayout.propType = {
  mainContent: PropTypes.node.isRequired,
  sideContent: PropTypes.node,
  showSidePanel: PropTypes.bool
};

export default GameLayout;
