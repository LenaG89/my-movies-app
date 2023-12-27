import React from "react";
import { Alert } from 'antd'
import './Error.css'

function Error({ errorMessage }) {
  return (
    <Alert
      message="Something went wrong! "
      description={errorMessage}
      type="error"
      className="alert-error"
    />
  )
}

export default Error