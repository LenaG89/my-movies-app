import React, { Component } from "react";
import HeaderMenu from "../Header/Header";
import SearchPanel from "../SearchPanel/SearchPanel";
import MoviesList from "../MoviesList/MoviesList";
import { Pagination, Layout, ConfigProvider } from "antd";
import MoviesDBService from "../../services/moviesDB-service";

import "./App.css";

export default class App extends Component {
  moviesService = new MoviesDBService();
  state = {
    moviesDate: [
      {
        label: "The way back",
        date: "March 5, 2020 ",
        description:
          "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...",
        rate: 5.5,
        style: null,
        id: null,
        poster: null,
      },
    ],
  };
  constructor() {
    super();
    this.getMovies();
  }

  getMovies() {
    this.moviesService.getAllMovies().then((movies) => {
      this.setState(({moviesDate}) => {
        const newArray = movies.map((movie) => {
          return {
            label: movie.title,
            date: movie.release_date,
            description: movie.overview,
            rate: movie.vote_average,
            id: movie.id,
            poster: movie.poster_path
          };
        });
        return {
          moviesDate: newArray,
        };
      });
    });
  }

  render() {
    return (
      <Layout className="moviesapp">
        <HeaderMenu />
        <SearchPanel />
        <MoviesList movies={this.state.moviesDate} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px 0 0 0",
          }}
        >
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
      </Layout>
    );
  }
}
