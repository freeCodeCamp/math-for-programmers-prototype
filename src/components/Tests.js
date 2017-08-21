import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Tests = ({ tests }) => {
  const testsMsgs = tests.map((x, i) => {
    const msg = x.split(/, 'message: /)[1].replace(/'.*$/, '');
    return (
      <div className='test' key={i}>
        <i
          aria-hidden='true'
          className='fa fa-code'
          // className='fa fa-times'
          // className='fa fa-check'
        />
        <p
          dangerouslySetInnerHTML={{ __html: msg }}
          key={i}
        />
      </div>
    );
  });

  return (
    <div className='Tests'>
      {testsMsgs}
    </div>
  );
};

Tests.propTypes = {
  tests: PropTypes.array
};

const mapStateToProps = state => ({
  tests: state.challenge.tests
});

export default connect(mapStateToProps)(Tests);
