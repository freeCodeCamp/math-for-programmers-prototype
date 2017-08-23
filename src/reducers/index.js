import { UPDATE_CODE, RUN_TESTS, SET_CHALLENGE } from '../actions';
import data from '../data.json';

// Add status to each test
data.challenges.forEach(c => {
  c.tests = c.tests.map(t => ({
    test: t,
    status: 'init'
  }));
});

const initState = {
  code: '\\[ f(n) = n^5 + 4n^2 + 2 |_{n=17} \\]',
  challenges: data.challenges,
  activeChallenge: 0
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_CODE:
      return {
        ...state,
        code: action.code
      };
    case RUN_TESTS:
      console.log('Running Tests');
      return state;
    case SET_CHALLENGE:
      return {
        ...state,
        activeChallenge: Number.parseInt(action.index, 10)
      };
    default:
      return state;
  }
};

export default reducer;
