import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as MathJax from 'react-mathjax-updated';

const ChallengeInfo = ({ title, description }) => {

  const desc = description.map((x, i) => {
    const re = /(<math>(?:(?!<\/math>).)*<\/math>)/g;
    const hasMath = re.test(x);

    if (hasMath) {
      const strArr = x.split(re);
      const isBlock = (x.match(re) || []).length === 1;

      const elemArr = strArr.map((str, index) => {
        const hasMath = (/<math>/g).test(str);

        if (hasMath) {
          const newStr = str.replace(/(<math>|<\/math>)/g, '');
          return (
            <MathJax.Node inline={!isBlock} key={`math${index}`}>
              {newStr}
            </MathJax.Node>
          );
        }
        return (
          <p
            dangerouslySetInnerHTML={{ __html: str }}
            key={`p${index}`}
            style={{ display: isBlock ? 'block' : 'inline' }}
          />
        );
      });

      return <div key={i}>{elemArr}</div>;
    }
    return <p dangerouslySetInnerHTML={{ __html: x }} key={i} />;
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
