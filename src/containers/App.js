import React, { Component } from 'react';
import Editor from './Editor';
import Preview from '../components/Preview';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>Math LaTeX</h1>
        <Editor />
        <Preview />
      </div>
    );
  }
}

export default App;
