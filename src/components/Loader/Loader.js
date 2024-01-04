import React from "react";
import { Spin, ConfigProvider } from "antd";

import "./Loader.css"

 const Loader = () => {
   return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '25%' }}>
      <ConfigProvider
        theme={{
          token: {
            controlHeight: 150,
          },
        }}
      >
        <Spin />
      </ConfigProvider>
    </div>
  )
 }
 export default Loader