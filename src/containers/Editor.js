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
  render() {
    const { code, updateCode } = this.props;
    const options = {
      lineNumbers: true,
      mode: 'stex',
      theme: 'monokai'
    };

    return (
      <CodeMirror
        autoFocus={true}
        onChange={code => updateCode(code)}
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
