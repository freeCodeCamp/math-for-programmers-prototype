import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { runTests, setChallenge, resetCurrentChallengeTests } from '../actions';

const ChallengeControl = ({
  activeChallenge,
  challengeTitles,
  totalChallenges,
  runTests,
  setChallenge
}) => {
  const prevChallenge = () => {
    const index = !activeChallenge ? totalChallenges - 1 : activeChallenge - 1;
    setChallenge(index);
  };

  const nextChallenge = () => {
    setChallenge((activeChallenge + 1) % totalChallenges);
  };

  const padNumber = num => {
    return num < 10 ? '0' + num : num;
  };

  return (
    <div className='ChallengeControl'>
      <select
        onChange={e => setChallenge(e.target.value)}
        value={activeChallenge}
        >
        {challengeTitles.map((title, i) =>
          (<option
            key={`option${i}`}
            value={i}
            >
            {`${padNumber(i + 1)}: ${title}`}
          </option>)
        )}
      </select>
      <button onClick={runTests}>Run Tests (Ctrl/Cmd + Enter)</button>
      <button onClick={prevChallenge}>Prev Challenge</button>
      <button onClick={nextChallenge}>Next Challenge</button>
      <button
        onClick={() =>
          window.open('https://github.com/juandaco/math-latex/issues')}
        >
        Bugs
      </button>
    </div>
  );
};

ChallengeControl.propTypes = {
  activeChallenge: PropTypes.number,
  challengeTitles: PropTypes.array,
  runTests: PropTypes.func,
  setChallenge: PropTypes.func,
  totalChallenges: PropTypes.number
};

const mapStateToProps = state => ({
  activeChallenge: state.activeChallenge,
  challengeTitles: state.challenges.map(c => c.title),
  totalChallenges: state.challenges.length
});

const mapDispatchToProps = dispatch => ({
  runTests: () => dispatch(runTests()),
  setChallenge: index => {
    dispatch(resetCurrentChallengeTests());
    dispatch(setChallenge(index));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeControl);
