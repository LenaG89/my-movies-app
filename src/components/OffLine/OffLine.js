import React, { Component } from "react";
import { Alert, Space } from "antd";

export default class OffLine extends Component {
  render() {
    return (
      <Space
        direction="vertical"
        style={{
          width: "100%",
          padding: "20px",
        }}
      >
        <Alert
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
