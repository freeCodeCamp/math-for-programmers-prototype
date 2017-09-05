import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as MathJax from 'react-mathjax-updated';

const Preview = ({ code }) => {
  const mathDelimStart = /(\\\[|\\\(|\$\$?)/g;
  const mathDelimEnd = /(\\\]|\\\)|\$\$?)/g;
  return (
    <div className='Preview'>
      <h3>Preview:</h3>
      <MathJax.Context className='MathView'>
        <MathJax.Node>
          {code
            ? code.replace(mathDelimStart, '').replace(mathDelimEnd, '')
            : ''}
        </MathJax.Node>
      </MathJax.Context>
    </div>
  );
};

Preview.propTypes = {
  code: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  code: state.code
});

export default connect(mapStateToProps)(Preview);
