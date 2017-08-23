import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const testStatus2Icon = status => {
  switch (status) {
    case 'failed':
      return 'times';
    case 'passed':
      return 'check';
    default:
      return 'cog';
  }
};

const testStatus2Color = status => {
  switch (status) {
    case 'failed':
      return 'red';
    case 'passed':
      return 'green';
    default:
      // Dark Grey
      return '#939393';
  }
};

const Tests = ({ tests }) => {
  const testsMsgs = tests.map((x, i) => {
    const msg = x.test.split(/, 'message: /)[1].replace(/'.*$/, '');
    return (
      <div className='test' key={i}>
        <i
          aria-hidden='true'
          className={`fa fa-${testStatus2Icon(x.status)}`}
          style={{
            color: testStatus2Color(x.status)
          }}
        />
        <p dangerouslySetInnerHTML={{ __html: msg }} key={i} />
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

const mapStateToProps = state => {
  return {
    tests: state.challenges[state.activeChallenge].tests
  };
};

export default connect(mapStateToProps)(Tests);
