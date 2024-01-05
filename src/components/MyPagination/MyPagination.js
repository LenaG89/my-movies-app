import React, { Component } from "react";
import { ConfigProvider, Pagination } from "antd";
import PropTypes from "prop-types";
import './MyPagination.css'

export default class MyPagination extends Component {
  static propTypes = {
    searchMovie: PropTypes.func,
    getPageSession: PropTypes.func,
    page: PropTypes.number,
    totalPage: PropTypes.number,
  };

    handleChange = (page) => { 
      if (this.props.pageTab === 'Search') {
        this.props.searchMovie(this.props.queryMovie, page)
      }
      if (this.props.pageTab === 'Rated') { 
        this.props.getPageSession(page)
      }    
    } 
   
render() {
    const {page, totalPage } = this.props;
    return (
        <div className="mypagination" >
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#fff",
                  },
                  components: {
                    Pagination: {
                      itemActiveBg: "#1677ff",
                      itemSize: 24,
                    },
                  },
                }}
              >
                <Pagination
                onChange={this.handleChange}
                defaultCurrent={page} 
                total={totalPage} 
                pageSize={1} 
                showSizeChanger={false}
                />
              </ConfigProvider>
            </div>
    )
} 
}
 