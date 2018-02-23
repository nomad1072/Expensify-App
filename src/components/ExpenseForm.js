import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = new moment();
console.log(now.format('MMMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      note: props.expense ? props.expense.note : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      err: ''
    };
  }

  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ amount: e.target.value });
    }

  }
  onNoteChange = (e) => {
    this.setState({ note: e.target.value });
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState({ createdAt });
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState({ calendarFocused: focused });
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState({ err: 'Please Provide description and amount' });
    } else {
      this.setState({ err: '' });
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      })
      console.log('Submitted');
    }
  }
  render() {
    return (
      <div>
        {this.state.err && <p>{this.state.err}</p>}
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Description" autoFocus value={this.state.description} onChange={this.onDescriptionChange} />
          <input type="number" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange} />
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