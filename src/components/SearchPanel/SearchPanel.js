import React from 'react';
import { AutoComplete } from 'antd';
const options = [
  {
    value: 'Burns Bay Road',
  },
  {
    value: 'Downing Street',
  },
  {
    value: 'Wall Street',
  },
];
const SearchPanel = () => (
  <AutoComplete
    style={{
      width: '100%',
      margin: '19px 0 36px 0',
      boxSizing: 'border-box'

    }}
    options={options}
    placeholder="Type to search..."
    filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  />
);
export default SearchPanel;




