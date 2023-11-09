import React from 'react';

//It displays a loader animation and a loading text to indicate that content is being loaded.

const LoadingIndicator = () => (
  <div className="loading-indicator">
    <div className="loader"></div>
    <div className="loading-text">Loading...</div>
  </div>
);

export default LoadingIndicator;
