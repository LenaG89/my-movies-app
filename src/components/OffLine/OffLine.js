import React, { Component } from "react";
import { Alert, Space } from "antd";

import "./OffLine.css";

export default class OffLine extends Component {
  render() {
    return (
      <Space
        direction="vertical"
        style={{
          width: "100%",
          minHeight: "100%",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Alert
          className="alert-offline"
          message="No internet connection"
          description="Check internet connection or use vpn"
          type="error"
          closable
          showIcon
        />
      </Space>
    );
  }
}
