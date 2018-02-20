import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = new moment();
console.log(now.format('MMMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
  state = {
    description: '',
    amount: '',
    note: '',
    createdAt: moment(),
    calendarFocused: false
  };
  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (amount.match(/^\d*(\.\d{0,2})?$/)) {
      this.setState({ amount: e.target.value });
    }

  }
  onNoteChange = (e) => {
    this.setState({ note: e.target.value });
  };
  onDateChange = (createdAt) => {
    this.setState({ createdAt });
  };
  onFocusChange = ({ focused }) => {
    this.setState({ calendarFocused: focused });
  };
  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Description" autoFocus value={this.state.description} onChange={this.onDescriptionChange} />
          <input type="text" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange} />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false} />
          <textarea placeholder="Add a note for your expenses(optional)" value={this.state.note} onChange={this.onNoteChange} />
          <button>Add Expense</button>
        </form>
      </div >
    );
  }
};