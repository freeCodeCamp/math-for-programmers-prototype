import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as MathJax from 'react-mathjax-updated';

const Preview = ({ code }) =>
  (<MathJax.Context>
    <MathJax.Node>
      {this.props.code}
    </MathJax.Node>
  </MathJax.Context>);

Preview.propTypes = {
  code: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  code: state.code
});

export default connect(mapStateToProps)(Preview);
