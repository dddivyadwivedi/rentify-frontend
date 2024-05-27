import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './Spinner.css'; // Import the CSS file for custom styles

function Spin() {
  return (
    <div className="spinner-container">
      <Spinner animation="grow" />
    </div>
  );
}

export default Spin;
