import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCode } from '../actions';

// CodeMirror Imports
import CodeMirror from 'react-codemirror';
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
  codeChange(code) {
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
      extraKeys: {
        Tab: this.tabToSpaces
      },
      mode: 'stex',
      tabSize: 2,
      theme: 'monokai'
    };

    return (
      <CodeMirror
        autoFocus={true}
        onChange={code => this.codeChange(code)}
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

const mapStateToProps = state => ({
  code: state.code
});

const mapDispatchToProps = dispatch => ({
  updateCode: code => {
    dispatch(updateCode(code));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
