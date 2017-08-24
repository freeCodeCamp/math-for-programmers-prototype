import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { runTests } from '../actions';
import Editor from './Editor';
import Preview from '../components/Preview';
import ChallengeInfo from '../components/ChallengeInfo';
import ChallengeControl from '../components/ChallengeControl';
import Tests from '../components/Tests';

class App extends Component {
  componentDidMount() {
    window.addEventListener('keypress', e => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.props.runTests();
      }
    });
  }

  render() {
    return (
      <div className='App'>
        <h1>Math LaTeX Challenges</h1>
        <div className='content'>
          <div className='content-left'>
            <ChallengeControl />
            <ChallengeInfo />
          </div>
          <div className='content-right'>
            <Editor />
            <Preview />
            <Tests />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  runTests: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  runTests: () => dispatch(runTests())
});

export default connect(null, mapDispatchToProps)(App);
