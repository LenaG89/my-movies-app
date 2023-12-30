import React, { Component } from "react";
import HeaderMenu from "../Header/Header";

import MoviesList from "../MoviesList/MoviesList";
import OffLine from "../OffLine/OffLine";
import { Offline, Online } from "react-detect-offline";
import { Layout } from "antd";
import MoviesDBService from "../../services/moviesDB-service";
import GuestSession from "../../services/guest-session";

import "./App.css";

export default class App extends Component {
  moviesService = new MoviesDBService();
  guest = new GuestSession();
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
