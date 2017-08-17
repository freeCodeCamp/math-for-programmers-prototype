import React, { Component } from 'react';
import Editor from './Editor';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>Math LaTeX</h1>
        <Editor />
      </div>
    );
  }
}

export default App;
