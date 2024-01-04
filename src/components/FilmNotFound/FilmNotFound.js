import React from "react";
import { Alert } from "antd";

const FilmNotFound = () => {
  return (
    <Alert
      message="Film not found!"
      description="Please change the request and try again"
      type="info"
      className="alert-film-not-found"
      showIcon
    />
  );
};
export default FilmNotFound;
