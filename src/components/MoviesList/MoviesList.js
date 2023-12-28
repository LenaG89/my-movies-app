import React, { Component } from "react";
import MoviCard from "../MoviCard/MoviCard";
import Loader from "../Loader/Loader";
import SearchPanel from "../SearchPanel/SearchPanel";
import FilmNotFound from "../FilmNotFound/FilmNotFound";
import MyPagination from "../MyPagination/MyPagination";
import MoviesDBService from "../../services/moviesDB-service";

import Error from "../Error/Error";

import "./MoviesList.css";

export default class MoviesList extends Component {
  moviesService = new MoviesDBService();

  state = {
    moviesDate: [],
    filmNotFound: false,
    loading: false,
    error: false,
    errorMessage: ''
  };

  onError = (err) => {
this.setState({loading: false,
    error: true,
    errorMessage: err.message,
})
  };
  searchMovie = (movieName) => {
    this.setState({loading: true})
    if (movieName.trim() !== ' '){
        this.moviesService
        .getAllMovies(movieName)
        .then((movies) => {
            if (movies.length !== 0){
            this.setState({ moviesDate: movies, loading: false, filmNotFound: false })}
        else {
            this.setState({
                loading: false,
                filmNotFound: true
            })
        }})
        .catch( this.onError)
    
}}
     
  render() {
    const { moviesDate, loading, error, errorMessage } = this.state;
    const hasDate = !(loading || error)
    const spinner = loading ? <Loader /> : null;
    const errorIndicator = error ? <Error errorMessage={errorMessage}/> : null;
    const content = hasDate ? <MoviesItems moviesDate={moviesDate} /> : null;
    const noFilm = !hasDate ? <FilmNotFound /> : null;
    const mypagination = (moviesDate.length > 0) ? <MyPagination /> : null;

    return (
        <>
        <SearchPanel searchMovie={this.searchMovie}/>
      <ul className="moviesList">
        {errorIndicator}
        {spinner}
        {content}
        {noFilm}
      </ul>
      {mypagination}
        </>
        
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
