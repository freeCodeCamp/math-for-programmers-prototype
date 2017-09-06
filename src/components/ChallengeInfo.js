import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as MathJax from 'react-mathjax-updated';

// Converts all math tag to MathJax
const parseMathJax = (str, i) => {
  const isBlock =
    str.match(/<math>/g).length === 1 &&
    str.startsWith('<math>') &&
    str.endsWith('</math>');

  let index = 0;
  const objArr = [];
  while (str.includes('<math>')) {
    let tmpIndx = str.indexOf('<math>');
    const pStr = str.slice(0, tmpIndx);
    objArr.push(
      <p
        dangerouslySetInnerHTML={{ __html: pStr }}
        key={`in${index}`}
        style={{ display: isBlock ? 'block' : 'inline' }}
      />
    );
    index++;

    str = str.slice(tmpIndx + 6);
    tmpIndx = str.indexOf('</math>');
    const mathExp = str.slice(0, tmpIndx);
    objArr.push(
      <MathJax.Node inline={!isBlock} key={`in${index}`}>
        {mathExp}
      </MathJax.Node>
    );
    index++;
    str = str.slice(tmpIndx + 7);
  }

  if (str) {
    objArr.push(
      <p
        dangerouslySetInnerHTML={{ __html: str }}
        key={'lastelem'}
        style={{ display: 'inline' }}
      />
    );
  }

  return <div key={i}>{objArr}</div>;
};

const ChallengeInfo = ({ title, description }) => {
  const desc = description.map((x, i) => {
    if (!x.includes('<math>')) {
      return <p dangerouslySetInnerHTML={{ __html: x }} key={i} />;
    }
    return parseMathJax(x, i);
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
