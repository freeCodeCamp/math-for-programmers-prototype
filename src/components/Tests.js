import React, { Component } from 'react';
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

class Tests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tests: this.props.tests.map(t => ({
        test: t,
        status: 'init'
      }))
    };
  }

  render() {
    const { tests } = this.state;
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
        {tests.every(t => t.status === 'passed') ? (
          <h2>
            <i aria-hidden='true' className={'fa fa-check'} />
            All Tests Passed
          </h2>
        ) : null}
        {testsMsgs}
      </div>
    );
  }
}

Tests.propTypes = {
  code: PropTypes.string,
  tests: PropTypes.array
};

const mapStateToProps = state => {
  return {
    code: state.code,
    tests: state.challenges[state.activeChallenge].tests
  };
};

export default connect(mapStateToProps)(Tests);
