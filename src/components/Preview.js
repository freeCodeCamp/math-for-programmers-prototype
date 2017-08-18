import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as MathJax from 'react-mathjax-updated';

const Preview = ({ code }) => {
  const mathDelimStart = /(\\\[|\\\(|\$\$)/g;
  const mathDelimEnd = /(\\\]|\\\)|\$\$)/g;
  return (<MathJax.Context>
    <MathJax.Node>
      {code.replace(mathDelimStart, '').replace(mathDelimEnd, '')}
    </MathJax.Node>
  </MathJax.Context>);
};

Preview.propTypes = {
  code: PropTypes.string.isRequired
};

Preview.defaultProps = {
  name: ''
};

const mapStateToProps = state => ({
  code: state.code
});

export default connect(mapStateToProps)(Preview);
