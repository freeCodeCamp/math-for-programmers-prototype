import React, { Component } from 'react';
import PropTypes from 'prop-types';

// CodeMirror Imports
import CodeMirror from 'react-codemirror2';
import 'codemirror/mode/stex/stex';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
      timer: null
    };
    // Function Bindings
    this.tabToSpaces = this.tabToSpaces.bind(this);
    this.codeChange = this.codeChange.bind(this);
  }

  /*
    Prevents uppdating the code too fast
    for correct Preview rendering
  */
  codeChange(cm, meta, code) {
    const { updateCode } = this.props;
    const { waiting, timer } = this.state;
    const delay = 500;

    if (waiting) {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        this.setState({
          waiting: false
        });
        updateCode(code);
      }, delay);
      this.setState({
        timer: newTimer
      });
    } else {
      const newTimer = setTimeout(updateCode(code), delay);
      this.setState({
        waiting: true,
        timer: newTimer
      });
    }
  }

  tabToSpaces(cm) {
    const spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
    cm.replaceSelection(spaces);
  }

  render() {
    const { code } = this.props;
    const options = {
      lineNumbers: true,
      lineWrapping: true,
      extraKeys: {
        Tab: this.tabToSpaces
      },
      mode: 'stex',
      tabSize: 2,
      theme: 'monokai'
    };

    return (
      <CodeMirror
        editorDidMount={cm => cm.focus()}
        onValueChange={this.codeChange}
        onValueSet={cm => {
          // Prevent First line from being edited
          cm.markText(
            { line: 0, ch: 0 },
            { line: 1, ch: 0 },
            {
              atomic: true,
              inclusiveLeft: true,
              readOnly: true
            }
          );
          // Prevent Last line from being edited
          const lastLine = cm.lineCount() - 1;
          cm.markText(
            { line: lastLine, ch: 0 },
            { line: lastLine },
            {
              atomic: true,
              inclusiveLeft: true,
              inclusiveRight: true,
              readOnly: true
            }
          );
        }}
        options={options}
        value={code}
      />
    );
  }
}

Editor.propTypes = {
  code: PropTypes.string.isRequired,
  updateCode: PropTypes.func.isRequired
};

export default Editor;
