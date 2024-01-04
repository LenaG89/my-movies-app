import React, { Component } from "react";
import { ConfigProvider, Pagination } from "antd";

import './MyPagination.css'

export default class MyPagination extends Component {
    handleChange = (page) => {
      console.log(page, this.props.queryMovie, this.props.pageTab )
      if (this.props.pageTab === 'Search') {
  
        this.props.searchMovie(this.props.queryMovie, page)
      }
      if (this.props.pageTab === 'Rated') {
        console.log(page)
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
 