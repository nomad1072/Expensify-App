console.log('Counter redux running!');
const { createStore, combineReducers } = require('redux');
const uuid = require('uuid');

const SeedData = {
  counter: [{
    id: 'some random id',
    count: 0
  }]
};

const defaultCounter = {
  id: uuid(),
  name: 'Test Counter',
  count: 0
}

const counterStateReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COUNTER':
      console.log('Is it even coming here?');
      return state.concat({ ...defaultCounter, id: action.id, count: action.count, name: action.name });
    case 'REMOVE_COUNTER':
      return state.filter((counter) => {
        if (counter.id !== action.id) {
          return counter;
        }
      });
    case 'INCREMENT_COUNT':
      console.log('Increment Count');
      return state.map((counter) => {
        if (counter.id === action.id) {
          return {
            ...counter,
            count: counter.count + 1
          }
        } else {
          return counter;
        }
      });
    case 'DECREMENT_COUNT':
      console.log('Decrement count');
      return state.map((counter) => {
        if (counter.id === action.id) {
          return {
            ...counter,
            count: counter.count - 1
          }
        } else {
          return counter
        }
      });
    case 'RESET_COUNT':
      console.log('Reset Count: ');
      return state.map((counter) => {
        if (counter.id === action.id) {
          return {
            ...counter,
            count: 0
          }
        } else {
          return counter
        }
      });
    case 'SET_COUNT':
      console.log('Set Count: ');
      return state.map((counter) => {
        if (counter.id === action.id) {
          return {
            ...counter,
            count: action.count
          }
        } else {
          return counter
        }
      });
    default:
      console.log('No speciic reducer to handle this action');
  }
};

const store = createStore(counterStateReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

const counterOne = store.dispatch({
  type: 'ADD_COUNTER',
  id: uuid(),
  count: 20,
  name: 'Counter 1'
});

const counterTwo = store.dispatch({
  type: 'ADD_COUNTER',
  id: uuid(),
  count: 25,
  name: 'Counter 2'
});

const counterThree = store.dispatch({
  type: 'ADD_COUNTER',
  id: uuid(),
  count: 30,
  name: 'Counter 3'
});

store.dispatch({
  type: 'REMOVE_COUNTER',
  id: counterThree.id
})

store.dispatch({
  type: 'INCREMENT_COUNT',
  id: counterTwo.id
})

store.dispatch({
  type: 'DECREMENT_COUNT',
  id: counterOne.id
})

store.dispatch({
  type: 'RESET_COUNT',
  id: counterOne.id
})

store.dispatch({
  type: 'SET_COUNT',
  id: counterOne.id,
  count: 5
})