import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {

  switch (action.type) {
    case 'INCREMENT':
      console.log('INCREMENT');
      const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy
      };
    case 'DECREMENT':
      console.log('DECREMENT');
      const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
      return {
        count: state.count - decrementBy
      };
    case 'RESET':
      console.log('RESET');
      return {
        count: 0
      };
    case 'SET':
      return {
        count: action.count
      }
    default:
      return state;
  }
});
// subscribe is called when any change is made to store
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
})

// Actions - increment, decrement, reset
store.dispatch({
  type: 'INCREMENT',
  incrementBy: 5
});
unsubscribe();
store.dispatch({
  type: 'RESET'
});
store.dispatch({
  type: 'DECREMENT',
  decrementBy: 10
});

store.dispatch({
  type: 'SET',
  count: 15
})

console.log(store.getState());