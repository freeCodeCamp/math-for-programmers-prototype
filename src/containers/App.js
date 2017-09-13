import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCode, runTests } from '../actions';
import Editor from './Editor';
import Preview from '../components/Preview';
import ChallengeInfo from '../components/ChallengeInfo';
// import ChallengeControl from '../components/ChallengeControl';
import ChallengeTree from '../components/ChallengeTree';
// import Tests from '../components/Tests';

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
    const { code, data, description, title, updateCode } = this.props;
    return (
      <div className='App'>
        <h1>Math LaTeX Challenges</h1>
        <div className='content'>
          <div className='content-left'>
            <ChallengeTree data={data} />
            {/* <ChallengeControl /> */}
          </div>
          <div className='content-center'>
            <ChallengeInfo description={description} title={title} />
          </div>
          <div className='content-right'>
            <Editor code={code} updateCode={updateCode} />
            <Preview code={code} />
            {/* <Tests tests={challenge.tests}/> */}
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
  title: PropTypes.string,
  updateCode: PropTypes.func
};

const mapStateToProps = state => ({
  code: state.code,
  data: state.data,
  description: state.challenge.description,
  title: state.challenge.title
});

const mapDispatchToProps = dispatch => ({
  runTests: () => dispatch(runTests()),
  updateCode: code => dispatch(updateCode(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
