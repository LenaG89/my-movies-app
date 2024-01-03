import React, { Component } from "react";

import SearchList from "../SearchList/SearchList";
import RatedList from "../RatedList/RatedList";
import OffLine from "../OffLine/OffLine";
import { Offline, Online } from "react-detect-offline";
import { Tabs } from "antd";
import MoviesDBService from "../../services/moviesDB-service";

import "./App.css";

export default class App extends Component {
  moviesService = new MoviesDBService();

  state = {
    pageTab: "Search",
    genres: [],
   
  };

  getSessionId = () => {
    this.moviesService
        .getGuestSessionId()
        .then((token) => { localStorage.setItem('guest', `${token}`)
        console.log(localStorage.getItem('guest'));
            })
        
        .catch(this.onError);
  }

  onRateChange = (id, rating) => {
    console.log(rating)
    this.moviesService
      .addMovieRatingStars( id, rating)
      
      .catch(this.onError);
  };
  onError = (err) => {
    this.setState({ loading: false, error: true, errorMessage: err.message });
  };
  getGuestSession = (page = 1) => {
    console.log(this.guest.getSession(this.state.guestSessionId, page));
    return this.guest.getSession(this.state.guestSessionId, page);
  };
  componentDidMount() {
    this.getSessionId();
    
  }
  render() {
    const { pageTab } = this.state;
    return (
      <>
        <Offline>
          <OffLine />
        </Offline>
        <Online>
          <div className="moviesapp">
            <Tabs
              defaultActiveKey="Search"
              centered
              items={[
                {
                  key: "Search",
                  label: "Search",
                  children: <SearchList onRateChange={this.onRateChange} />,
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
        </Online>
      </>
    );
  }
}
