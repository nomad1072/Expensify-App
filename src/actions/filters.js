// Set Text Filter

export const filterText = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

// Sort By Amount

export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
  sortBy: 'amount'
});

// Sort By Date

export const sortByDate = () => ({
  type: 'SORT_BY_DATE',
  sortBy: 'date'
});

// Set start Data

export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})

// Set end Date

export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})
