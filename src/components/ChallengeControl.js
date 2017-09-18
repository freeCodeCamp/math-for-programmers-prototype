import React from 'react';
import PropTypes from 'prop-types';

const ChallengeControl = ({ runTests }) => {
  return (
    <div className='ChallengeControl'>
      <button onClick={runTests}>Run Tests (Ctrl/Cmd + Enter)</button>
      <button
        onClick={() =>
          window.open(
            'https://github.com/freecodecamp/' +
              'math-for-programmers-prototype/issues'
          )}
        >
        Bugs
      </button>
    </div>
  );
};

ChallengeControl.propTypes = {
  runTests: PropTypes.func
};

export default ChallengeControl;
