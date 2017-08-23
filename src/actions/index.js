export const UPDATE_CODE = 'UPDATE_CODE';
export const RUN_TESTS = 'RUN_TESTS';
export const SET_CHALLENGE = 'SET_CHALLENGE';

export const updateCode = code => ({
  type: UPDATE_CODE,
  code
});

export const runTests = () => ({
  type: RUN_TESTS
});

export const setChallenge = index => ({
  type: SET_CHALLENGE,
  index
});
