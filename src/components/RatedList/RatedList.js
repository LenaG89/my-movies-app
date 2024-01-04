import React, { Component } from "react";
import MoviCard from "../MoviCard/MoviCard";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import MyPagination from "../MyPagination/MyPagination";
import MoviesDBService from "../../services/moviesDB-service";



import "./RatedList.css";

export default class RatedList extends Component {
  moviesService = new MoviesDBService();
  

  state = {
    dataRated: [],
      page: 0,
      totalPage: 0,
      totalResults: 0,
      loading: false,
    error: false,
    errorMessage: "",
  };

  onError = (err) => {
    this.setState({ loading: false, error: true, errorMessage: err.message });
  };

  GuestSession = (page) => {
    this.setState({ loading: true });
    this.props
      .getGuestSession(page)
      .then((res) => {
       
            this.setState({
                dataRated: res.results,
                page: res.page,
                totalPage: res.total_pages,
                totalResults: res.total_results,
                loading: false,
              })
               
      }) 
      .catch((e) => this.onError(e))
  }

  componentDidMount() {
    this.GuestSession()
   
  }
  componentDidCatch(err){
    
    this.setState({error: true, errorMessage: err.message})
  }
  render() {
    const {
        dataRated,
      loading,
      error,
      errorMessage,
      page,
      totalPage
      
    } = this.state;
    if (error) {return <Error errorMessage={errorMessage}/>}
    const { pageTab } = this.props;
    const hasDate = !(loading || error);
    const spinner = loading ? <Loader /> : null;
    const errorIndicator = error ? <Error errorMessage={errorMessage} /> : null; 
    const content = hasDate ? <MoviesItems moviesDate={dataRated} /> : null;
   
    const mypagination =
    dataRated.length > 0 ? (
        <MyPagination
          pageTab  = {pageTab}
          getPageSession={(page)=>this.GuestSession(page)}
          page={page}
          totalPage={totalPage}
        />
      ) : null;

    return (
      <>
       {spinner}
       {errorIndicator}
        <ul className="moviesList">
          {content}
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
