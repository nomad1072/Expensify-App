import { combineReducers, createStore } from "redux";
import uuid from 'uuid';

// ADD_EXPENSE

const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  }) => ({
    type: 'ADD_EXPENSE',
    expense: {
      id: uuid(),
      description,
      note,
      amount,
      createdAt
    }
  })

// Remove Expense

const removeExpense = ({ id = 0 }) => ({
  type: 'REMOVE_EXPENSE',
  expense: {
    id
  }
});

// Edit Expense

const editExpense = ({ id, updates }) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// Set Text Filter

const filterText = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

// Sort By Amount

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
  sortBy: 'amount'
});

// Sort By Date

const sortByDate = () => ({
  type: 'SORT_BY_DATE',
  sortBy: 'date'
});

// Set start Data

const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})

// Set end Date

const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})


// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter((expense) => {
        if (expense.id !== action.expense.id) {
          return expense;
        }
      });
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          console.log('Equal');
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      })
    default:
      return state;
  }
};
// filters Reducer
const filterReducerDefaultState = {
  text: '',
  sortBy: '',
  startDate: undefined,
  endDate: undefined
}
const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: action.sortBy
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: action.sortBy
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state;
  }
};

// Get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  });
};


// Store Creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filterReducer
  }));

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({
  description: 'Rent',
  note: 'Monthly Rent Expense',
  amount: 1500,
  createdAt: 7
}));

const ExpenseTwo = store.dispatch(addExpense({
  description: 'Daaru',
  note: 'Monthly Daaru Expense',
  amount: 1400,
  createdAt: 7
}));
console.log('Remove Expense');
store.dispatch(removeExpense({ id: ExpenseTwo.expense.id }));
store.dispatch(editExpense({
  id: expenseOne.expense.id, updates: {
    description: 'tatti',
    amount: 2000
  }
}));
store.dispatch(filterText('rent'));
store.dispatch(sortByAmount());
store.dispatch(sortByDate());
store.dispatch(setStartDate(125));
store.dispatch(setEndDate(1250));
const demoState = {
  expenses: [{
    id: '1234567876543',
    description: 'Januray Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'date', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};