import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as MathJax from 'react-mathjax-updated';

class Preview extends Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (<MathJax.Context>
      <MathJax.Node>
        {this.props.code}
      </MathJax.Node>
    </MathJax.Context>);
  }
}

Preview.propTypes = {
  code: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  code: state.code
});

export default connect(mapStateToProps)(Preview);
