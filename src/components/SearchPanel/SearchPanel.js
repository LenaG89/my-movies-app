import React, { Component } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';
import PropTypes from "prop-types";

import './SearchPanel.css'

class SearchPanel extends Component  {
  static propTypes = {
    searchMovie: PropTypes.func,
  };

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




