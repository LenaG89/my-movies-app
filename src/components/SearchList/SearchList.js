import React, { Component } from "react";
import MoviCard from "../MoviCard/MoviCard";
import Loader from "../Loader/Loader";
import SearchPanel from "../SearchPanel/SearchPanel";
import FilmNotFound from "../FilmNotFound/FilmNotFound";
import MyPagination from "../MyPagination/MyPagination";
import MoviesDBService from "../../services/moviesDB-service";

import Error from "../Error/Error";

import "./SearchList.css";

export default class SearchList extends Component {
  moviesService = new MoviesDBService();

  state = {
    totalPage: null,
    page: null,
    queryMovie: null,
    moviesDate: [],
    filmNotFound: false,
    loading: false,
    error: false,
    errorMessage: "",
  };

  onError = (err) => {
    this.setState({ loading: false, error: true, errorMessage: err.message });
  };

  searchMovie = (movieName, numPage) => {
    this.setState({ loading: true });
    if (movieName.trim() !== " ") {
      this.moviesService
        .getAllMovies(movieName, numPage)
        .then((res) => {
          if (res.results.length !== 0) {
            this.setState({
              queryMovie: movieName,
              moviesDate: res.results,
              totalPage: res.total_pages,
              page: res.page,
              loading: false,
              filmNotFound: false,
            });
          } else {
            this.setState({
              loading: false,
              filmNotFound: true,
            });
          }
        })
        .catch(this.onError);
    }
  };
  componentDidCatch(err) {
    this.setState({ error: true, errorMessage: err.message });
  }
  render() {
    const {
      moviesDate,
      loading,
      error,
      errorMessage,
      page,
      totalPage,
      queryMovie,
      filmNotFound,
    } = this.state;
    if (error) {
      return <Error errorMessage={errorMessage} />;
    }
    const { pageTab } = this.props;
    const hasDate = !(loading || error);
    const spinner = loading ? <Loader /> : null;
    const errorIndicator = error ? <Error errorMessage={errorMessage} /> : null;
    const content = hasDate ? (
      <MoviesItems
        moviesDate={moviesDate}
        onRateChange={this.props.onRateChange}
      />
    ) : null;
    const noFilm =
      moviesDate.length === 0 && filmNotFound ? <FilmNotFound /> : null;
    const mypagination =
      moviesDate.length > 0 ? (
        <MyPagination
          searchMovie={this.searchMovie}
          page={page}
          totalPage={totalPage}
          queryMovie={queryMovie}
          pageTab={pageTab}
        />
      ) : null;

    return (
      <>
        <SearchPanel searchMovie={this.searchMovie} />
        {errorIndicator}
        {spinner}
        {noFilm}
        <ul className="moviesList">{content}</ul>
        {mypagination}
      </>
    );
  }
}
const MoviesItems = ({ moviesDate, onRateChange }) => {
  const moviCads = moviesDate.map((movie) => {
    const { id } = movie;
    return (
      <li className="cardItem" key={id}>
        <MoviCard
          movie={movie}
          onRateChange={(rating) => onRateChange(id, rating)}
        />
      </li>
    );
  });
  return moviCads;
};
