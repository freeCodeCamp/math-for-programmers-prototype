import React from 'react';
import PropTypes from 'prop-types';
import * as MathJax from 'react-mathjax-updated';

const ChallengeInfo = ({ title, description }) => {
  const desc = description.map((x, i) => {
    const re = /(<math>(?:(?!<\/math>).)*<\/math>)/g;
    const hasMath = re.test(x);

    if (hasMath) {
      const strArr = x.split(re);
      const isBlock = (x.match(re) || []).length === 1;

      const elemArr = strArr.map((str, index) => {
        const isMathNode = (/<math>/g).test(str);
        if (isMathNode) {
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
  description: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string
};

export default ChallengeInfo;
