import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {

  switch (action.type) {
    case 'INCREMENT':
      console.log('INCREMENT');
      return {
        count: state.count + 1
      };
    case 'DECREMENT':
      console.log('DECREMENT');
      return {
        count: state.count - 1
      };
    case 'RESET':
      console.log('RESET');
      return {
        count: 0
      };
    default:
      return state;
  }
});
// Actions - increment, decrement, reset
store.dispatch({
  type: 'INCREMENT'
});
store.dispatch({
  type: 'RESET'
});
store.dispatch({
  type: 'DECREMENT'
});

console.log(store.getState());