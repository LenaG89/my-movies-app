import React from "react";
import { ConfigProvider, Pagination } from "antd";

import './MyPagination.css'

const MyPagination = ()=>{
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
                <Pagination defaultCurrent={1} total={50} />
              </ConfigProvider>
            </div>
    )
}
export default MyPagination