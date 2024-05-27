// GlobalError.js
import React from 'react';
import { connect } from 'react-redux';
import './GlobalError.css';

const GlobalError = ({ globalError, clearGlobalError }) => {
  if (!globalError) return null;

  return (
    <div className="global-error">
      <p>{globalError}</p>
      <button onClick={clearGlobalError}>Dismiss</button>
    </div>
  );
};

const mapStateToProps = state => ({
  globalError: state.globalError.globalError,
});

const mapDispatchToProps = dispatch => ({
  clearGlobalError: () => dispatch({ type: 'CLEAR_GLOBAL_ERROR' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalError);
