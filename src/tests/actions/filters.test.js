import {
  setStartDate,
  setEndDate,
  filterText
} from '../../actions/filters'
import moment from 'moment'
test('should generate set start date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  })
});

test('should generte set end date action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  })
});

test('should set filter Text', () => {
  const text = 'Something';
  const action = filterText(text);
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'Something'
  })
})