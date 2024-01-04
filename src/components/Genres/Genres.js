import React, { Component } from "react";
import { GenresConsumer } from "../GenresContext/GenresContext";

import "./Genres.css"

export default class Genres extends Component {
    render(){
        const {genreIds} = this.props;
        return (
            <GenresConsumer>{
                (genres) => {
                    let genreNames = genreIds.map((item) => {
                        let getItem = genres.find((el) => el.id === item)
                        return getItem.name
                      })
                      let movieGenres = genreNames.slice(0, 3).map((name, id) => {
                        return (
                          <span key={id} className="genre">
                            {name}
                          </span>
                        )
                      })
                      return movieGenres
                    }}
                
            
                </GenresConsumer>
        )
    }
}