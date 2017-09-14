import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCode, runTests, setChallenge } from '../actions';

// Components
import ChallengeTree from '../components/ChallengeTree';
import ChallengeInfo from '../components/ChallengeInfo';
import Editor from './Editor';
import Preview from '../components/Preview';
import ChallengeControl from '../components/ChallengeControl';
import Tests from '../components/Tests';

class App extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.props.runTests();
      }
    });
  }

  render() {
    const {
      code,
      data,
      description,
      runTests,
      setChallenge,
      tests,
      title,
      updateCode
    } = this.props;
    return (
      <div className='App'>
        <h1>Math LaTeX Challenges</h1>
        <div className='content'>
          <div className='content-left'>
            <ChallengeTree data={data} setChallenge={setChallenge} />
          </div>
          <div className='content-center'>
            <ChallengeInfo description={description} title={title} />
          </div>
          <div className='content-right'>
            <Editor code={code} updateCode={updateCode} />
            <Preview code={code} />
            <ChallengeControl runTests={runTests} />
            <Tests tests={tests} />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  code: PropTypes.string,
  data: PropTypes.object,
  description: PropTypes.arrayOf(PropTypes.string),
  runTests: PropTypes.func,
  setChallenge: PropTypes.func,
  tests: PropTypes.array,
  title: PropTypes.string,
  updateCode: PropTypes.func
};

const mapStateToProps = state => ({
  code: state.code,
  data: state.data,
  description: state.challenge.description,
  title: state.challenge.title,
  tests: state.tests
});

const mapDispatchToProps = dispatch => ({
  runTests: () => dispatch(runTests()),
  setChallenge: (subject, topicIndex, challengeIndex) =>
    dispatch(setChallenge(subject, topicIndex, challengeIndex)),
  updateCode: code => dispatch(updateCode(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
