import React, { Component } from "react";
import HeaderMenu from "../Header/Header";

import SearchList from "../SearchList/SearchList";
import OffLine from "../OffLine/OffLine";
import { Offline, Online } from "react-detect-offline";
import { Layout } from "antd";
import MoviesDBService from "../../services/moviesDB-service";
import GuestSession from "../../services/guest-session";

import "./App.css";

export default class App extends Component {
  state = {
    pageTab: "search",
    genres: [],
    guestSessionId: "",
    dataRated: {
      moviesRated: [],
      totalPage: 0,
      page: 1,
    },
    error: false,
    errorMessage: "",
  };
  moviesService = new MoviesDBService();
  guest = new GuestSession();
  getToken = () => {
    const token = localStorage.getItem('guest')
    if (token) this.setState({ guestSessionId: token })
    else {
      this.guest
        .getGuestSessionId()
        .then((token) => {
          this.setState({ guestSessionId: token })
          localStorage.setItem('guest', `${token}`)
        })
        .catch(this.onError)
    }
  }
  onRateChange = (id, rating)=>{
this.guest.addMovieRatingStars( this.state.guestSessionId, id,  rating)
.catch(this.onError)
  }
  onError = (err) => {
    this.setState({ loading: false, error: true, errorMessage: err.message });
  };
  componentDidMount() {
  
    this.getToken()
  }
  render() {
    return (
      <>
        <Offline>
          <OffLine />
        </Offline>
        <Online>
          <Layout className="moviesapp">
            <HeaderMenu />
            <SearchList onRateChange={this.onRateChange}/>
          </Layout>
        </Online>
      </>
    );
  }
}
