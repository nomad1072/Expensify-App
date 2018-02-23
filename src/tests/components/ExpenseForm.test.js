import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import moment from 'moment';
test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render expense form with data', () => {
  const wrapper = shallow(<ExpenseForm expenses={} />);
});

test('shoudl render error on submitting wrong data', () => {
  const wrapper = shallow(<ExpenseList />);
  wrapper.find('form').simulate('submit', {
    prevenDefault: () => { }
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
})

test('should set description on input change', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
});

// should set note on textarea change
test('shoudl set note on text area change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = 'New Note Value';
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
})

test('should set amount if valid input', () => {
  const amount = '12.22';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { amount }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn()
  // onSubmitSpy('Andrew', 'Philadelphia');
  // expect(onSubmitSpy).toHaveBeenCalledWith('Andrew', 'Philadelphia');
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
  wrapper.find('form').simulate('submit', {
    prevenDefault: () => { }
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test('should set new date on date change', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(moment());
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('calendar Focues prop should return properly', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')(focused)
  expect(wrapper.state('calendarFocused')).toEqual(focused);
});