import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as MathJax from 'react-mathjax-updated';

const ChallengeInfo = ({ title, description }) => {
  const desc = description.map((x, i) => {
    if (!x.includes('<math>')) {
      return <p dangerouslySetInnerHTML={{ __html: x }} key={i} />;
    }

    let newX = x;
    const objArr = [];
    while (newX.includes('<math>')) {
      let tmpIndx = newX.indexOf('<math>');
      const pElem = newX.slice(0, tmpIndx);
      objArr.push(
        <p
          dangerouslySetInnerHTML={{ __html: pElem }}
          style={{ display: 'inline' }}
        />
      );

      newX = newX.slice(tmpIndx + 6);
      tmpIndx = newX.indexOf('</math>');
      const mathExp = newX.slice(0, tmpIndx);
      objArr.push(<MathJax.Node inline={true}>{mathExp}</MathJax.Node>);
      newX = newX.slice(tmpIndx + 7);
    }

    return <div key={i}>{objArr}</div>;
  });

  return (
    <div className='ChallengeInfo'>
      <h3>{title}</h3>
      <MathJax.Context>
        <div>{desc}</div>
      </MathJax.Context>
    </div>
  );
};

ChallengeInfo.propTypes = {
  description: PropTypes.array,
  title: PropTypes.string
};

const mapStateToProps = state => ({
  title: state.challenges[state.activeChallenge].title,
  description: state.challenges[state.activeChallenge].description
});

export default connect(mapStateToProps)(ChallengeInfo);
