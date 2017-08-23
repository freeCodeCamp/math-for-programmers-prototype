import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ChallengeInfo = ({ title, description }) => {
  const desc = description.map((x, i) =>
    <p dangerouslySetInnerHTML={{ __html: x }} key={i} />
  );

  return (
    <div className='ChallengeInfo'>
      <h3>
        {title}
      </h3>
      {desc}
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
