import React, { Component } from "react";
import MoviCard from "../MoviCard/MoviCard";
import Loader from "../Loader/Loader";
import MoviesDBService from "../../services/moviesDB-service";

import Error from "../Error/Error";

import "./MoviesList.css";

export default class MoviesList extends Component {
  moviesService = new MoviesDBService();

  state = {
    moviesDate: [],
    loading: true,
    error: false,
    errorMessage: ''
  };
  constructor() {
    super();
    this.getMovies();
  }
  onError = (err) => {
this.setState({loading: false,
    error: true,
    errorMessage: err.message,
})
  };
  getMovies() {
    this.moviesService
      .getAllMovies()
      .then((movies) => this.setState({ moviesDate: movies, loading: false }))
      .catch(this.onError);
  }

  render() {
    const { moviesDate, loading, error, errorMessage } = this.state;
    const hasDate = !(loading || error)
    const spinner = loading ? <Loader /> : null;
    const errorIndicator = error ? <Error errorMessage={errorMessage}/> : null;
    const content = hasDate ? <MoviesItems moviesDate={moviesDate} /> : null;

    return (
      <ul className="moviesList">
        {errorIndicator}
        {spinner}
        {content}
      </ul>
    );
  }
}
const MoviesItems = ({ moviesDate }) => {
  const moviCads = moviesDate.map((movie) => {
    const { id } = movie;
    return (
      <li className="cardItem" key={id}>
        <MoviCard movie={movie} />
      </li>
    );
  });
  return moviCads;
};
