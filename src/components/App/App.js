import React, { Component } from "react";
import HeaderMenu from "../Header/Header";

import MoviesList from "../MoviesList/MoviesList";
import OffLine from "../OffLine/OffLine";
import { Offline, Online } from "react-detect-offline";
import { Pagination, Layout, ConfigProvider } from "antd";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <>
        <Offline>
          <OffLine />
        </Offline>
        <Online>
          <Layout className="moviesapp">
            <HeaderMenu />
            <MoviesList />
          </Layout>
        </Online>
      </>
    );
  }
}
