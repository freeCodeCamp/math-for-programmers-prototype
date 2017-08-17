import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCode } from '../actions';

// CodeMirror Imports
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/stex/stex';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

const tabToSpaces = cm => {
  const spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
  cm.replaceSelection(spaces);
};

const Editor = ({ code, updateCode}) => {
    const options = {
      lineNumbers: true,
      extraKeys: {
        Tab: tabToSpaces
      },
      mode: 'stex',
      tabSize: 2,
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
};

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
