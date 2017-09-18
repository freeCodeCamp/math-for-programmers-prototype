import {
  UPDATE_CODE,
  RUN_TESTS,
  SET_CHALLENGE
} from '../actions';
import { assert } from 'chai';
import initState from './initState';
import initTests from '../helpers/initTests';

const reducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_CODE:
      return {
        ...state,
        code: action.code
      };
    case RUN_TESTS:
      return {
        ...state,
        tests: state.tests.map(t => {
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
        })
      };
    case SET_CHALLENGE:
      const { subject, topicIndex, challengeIndex } = action;
      sessionStorage.setItem('subject', subject);
      sessionStorage.setItem('topicIndex', topicIndex);
      sessionStorage.setItem('challengeIndex', challengeIndex);

      const challenge =
        state.data[subject][topicIndex].challenges[challengeIndex];
      return {
        ...state,
        challenge,
        code: '$$\n' + challenge.challengeSeed.join('\n') + '\n$$',
        tests: challenge.tests.map(initTests)
      };
    default:
      return state;
  }
};

export default reducer;
