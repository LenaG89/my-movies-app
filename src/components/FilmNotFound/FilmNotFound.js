import React from "react";
import { Alert } from "antd";

const FilmNotFound = () => {
    return (
        <Alert
      message="Something went wrong! "
      description='Please change the request and try again'
      type='info'
      className="alert-film-not-found"
    />
    )
}
export default FilmNotFound