export const UPDATE_CODE = 'UPDATE_CODE';
export const RUN_TESTS = 'RUN_TESTS';
export const SET_CHALLENGE = 'SET_CHALLENGE';
export const RESET_CURRENT_CHALLENGE_TESTS = 'RESET_CURRENT_CHALLENGE_TESTS';

export const updateCode = code => ({
  type: UPDATE_CODE,
  code
});

export const runTests = () => ({
  type: RUN_TESTS
});

export const setChallenge = (subject, topicIndex, challengeIndex) => ({
  type: SET_CHALLENGE,
  subject,
  topicIndex,
  challengeIndex
});
