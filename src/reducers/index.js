import { UPDATE_CODE } from '../actions';
import data from '../data.json';

const initState = {
  code: '\\[ f(n) = n^5 + 4n^2 + 2 |_{n=17} \\]',
  challenge: data.challenges[0],
  data
};

initState.challenge.tests = initState.challenge.tests.map(
  x =>
    (x = {
      test: x,
      status: 'init'
    })
);

const reducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_CODE:
      return {
        ...state,
        code: action.code
      };
    default:
      return state;
  }
};

export default reducer;
