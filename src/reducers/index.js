import {
  UPDATE_CODE,
  RUN_TESTS,
  SET_CHALLENGE,
  RESET_CURRENT_CHALLENGE_TESTS
} from '../actions';
import data from '../data2.json';
import { assert } from 'chai';

// Add status to each test
data.challenges.forEach(c => {
  c.tests = c.tests.map(t => ({
    test: t,
    status: 'init'
  }));
});

const initState = {
  code: '$$\n' + data.challenges[0].challengeSeed.join('\n') + '\n$$',
  challenges: data.challenges,
  activeChallenge: 0
};

const reducer = (state = initState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case UPDATE_CODE:
      return {
        ...state,
        code: action.code
      };
    case RUN_TESTS:
      newState.challenges[state.activeChallenge].tests = state.challenges[
        state.activeChallenge
      ].tests.map(t => {
        const strCode = t.test
          .replace(/^assert\(/g, '')
          .replace(/, 'message.*/, '');

        try {
          // Remove LaTeX Math delimiters before the test running
          const codeNoDelims = state.code
            .replace(/^.*\n/g, '')
            .replace(/\$\$.*$/g, '');
          // eslint-disable-next-line no-eval
          const res = eval(
            strCode.replace('expression', JSON.stringify(codeNoDelims))
          );
          assert(res);
          t.status = 'passed';
        } catch (e) {
          t.status = 'failed';
        }
        return t;
      });
      return newState;
    case SET_CHALLENGE:
      return {
        ...state,
        code:
          '$$\n' +
          state.challenges[action.index].challengeSeed.join('\n') +
          '\n$$',
        activeChallenge: Number.parseInt(action.index, 10)
      };
    case RESET_CURRENT_CHALLENGE_TESTS:
      newState.challenges[state.activeChallenge].tests = state.challenges[
        state.activeChallenge
      ].tests.map(t => {
        t.status = 'init';
        return t;
      });
      return newState;
    default:
      return state;
  }
};

export default reducer;
