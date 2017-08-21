import React, { Component } from 'react';
import Editor from './Editor';
import Preview from '../components/Preview';
import ChallengeInfo from '../components/ChallengeInfo';
import Tests from '../components/Tests';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>Math LaTeX Challenges</h1>
        <div className='content'>
          <div className='content-left'>
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

export default App;
