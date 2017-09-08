import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as MathJax from 'react-mathjax-updated';

const Preview = ({ code }) => {
  const mathDelims = /(^\$\$\n|\$\$$)/g;
  return (
    <div className='Preview'>
      <h3>Preview:</h3>
      <MathJax.Context className='MathView'>
        <MathJax.Node>
          {code
            ? code.replace(mathDelims, '')
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
