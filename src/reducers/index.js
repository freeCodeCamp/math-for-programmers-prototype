import { UPDATE_CODE } from '../actions';

const initState = {
  code: '\\[ f(n) = n^5 + 4n^2 + 2 |_{n=17} \\]'
};

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
