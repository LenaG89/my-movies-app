import React, { Component } from "react";
import Error from "../Error/Error";
import SearchList from "../SearchList/SearchList";
import RatedList from "../RatedList/RatedList";
import OffLine from "../OffLine/OffLine";
import { Offline, Online } from "react-detect-offline";
import { Tabs } from "antd";
import MoviesDBService from "../../services/moviesDB-service";
import {GenresProvider} from '../GenresContext/GenresContext'

import "./App.css";

export default class App extends Component {
  moviesService = new MoviesDBService();

  state = {
    pageTab: "Search",
    genres: [],
    error: false,
    errorMessage: '',
  };

  getSessionId = () => {
    this.moviesService
      .getGuestSessionId()
      .then((token) => {
        localStorage.setItem("guest", `${token}`);
      })

      .catch(this.onError);
  };

  onRateChange = (id, rating) => {
    
    localStorage.setItem(`${id}`, `${rating}`);
    this.moviesService
      .addMovieRatingStars(id, rating)
      .catch(this.onError);
  };
  onError = (err) => {
    this.setState({ error: true, errorMessage: err.message });
  };
  getGuestSession = (page = 1) => {
    return this.moviesService.getSession(page);
  };
  getGenres = () => {
    this.moviesService.getGenres()
    .then((res)=> this.setState({genres: res }))
    .catch(this.onError);
  }
  componentDidMount() {
    this.getSessionId();
    this.getGenres()
  }
  componentDidCatch(err){
    
    this.setState({error: true, errorMessage: err.message})
  }
  render() {
    const { pageTab, error, errorMessage } = this.state;
    if (error) {return <Error errorMessage={errorMessage}/>}
    
    return (
      <>
        <Offline>
          <OffLine />
        </Offline>
        <Online>
        <GenresProvider value={this.state.genres}>
          <div className="moviesapp">
            <Tabs
              defaultActiveKey="Search"
              centered
              destroyInactiveTabPane="true"
              items={[
                {
                  key: "Search",
                  label: "Search",
                  children: (
                    <SearchList
                      onRateChange={this.onRateChange}
                      pageTab={pageTab}
                    />
                  ),
                },
                {
                  key: "Rated",
                  label: "Rated",
                  children: (
                    <RatedList
                      getGuestSession={this.getGuestSession}
                      pageTab={pageTab}
                    />
                  ),
                },
              ]}
              onChange={(key) =>
                this.setState({
                  pageTab: key,
                })
              }
            />
          </div>
          </GenresProvider>
        </Online>
      </>
    );
  }
}
