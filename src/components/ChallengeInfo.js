import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as MathJax from 'react-mathjax-updated';

const ChallengeInfo = ({ title, description }) => {
  const desc = description.map((x, i) => {
    if (!x.includes('<math>')) {
      return <p dangerouslySetInnerHTML={{ __html: x }} key={i} />;
    }

    const isNotInline =
      x.match(/<math>/g).length === 1 &&
      x.startsWith('<math>') &&
      x.endsWith('</math>');

    let newX = x;
    const objArr = [];
    while (newX.includes('<math>')) {
      let tmpIndx = newX.indexOf('<math>');
      const pElem = newX.slice(0, tmpIndx);
      objArr.push(
        <p
          dangerouslySetInnerHTML={{ __html: pElem }}
          style={{ display: isNotInline ? 'block' : 'inline' }}
        />
      );

      newX = newX.slice(tmpIndx + 6);
      tmpIndx = newX.indexOf('</math>');
      const mathExp = newX.slice(0, tmpIndx);
      objArr.push(<MathJax.Node inline={!isNotInline}>{mathExp}</MathJax.Node>);
      newX = newX.slice(tmpIndx + 7);
    }
    if (newX) {
      objArr.push(<p
        dangerouslySetInnerHTML={{ __html: newX }}
        style={{ display: 'inline' }}
      />);
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
