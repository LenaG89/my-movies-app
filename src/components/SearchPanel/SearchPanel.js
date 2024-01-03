import React, { Component } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

import './SearchPanel.css'

class SearchPanel extends Component  {
  state={
    label: '',
  
  }
  
  onLabelChange = debounce((e) => {
    const searchKeyWords = e.target.value;
    this.setState({label: searchKeyWords})
    this.props.searchMovie(searchKeyWords)
  }, 500)
  render(){
    return <Input className='search-panel' name='search' onChange= {this.onLabelChange} placeholder="Type to search..." value={this.state.value} />
  }
}
  
export default SearchPanel;




