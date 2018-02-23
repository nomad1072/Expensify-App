import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = (props) => {
  console.log(props);
  return (
    <div>
      <ExpenseForm
        expense={props.expense}
        onSubmit={(expense) => {
          props.dispatch(editExpense(props.expense.id, expense));
          props.history.push('/')
          console.log('updated', expense);
        }}
      />
      <button onClick={(e) => {
        props.dispatch(removeExpense({ id: props.expense.id }))
        props.history.push('/')
      }}>Remove</button>
      This is from my edit expense component with id {props.match.params.id}
    </div>)
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => {
      console.log('Expense; ', expense.id);
      console.log('Props Match id; ', props.match.params.id);
      return expense.id === props.match.params.id;
    })
  };
};

export default connect(mapStateToProps)(EditExpensePage);
