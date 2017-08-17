import React, { Component } from 'react';
import { connect } from 'react-redux';

class Preview extends Component {
  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({
  code: state.code
});

export default connect(mapStateToProps)(Preview);
