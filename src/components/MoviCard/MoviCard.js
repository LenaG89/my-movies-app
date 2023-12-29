import React, { Component } from "react";
import { Rate } from "antd";
import no_image from "./no_image.png";
import { format, parseISO } from "date-fns";

import "./MoviCard.css";

export default class MoviCard extends Component {
  kitcut(text, limit = 150) {
    var description = text.trim();
    if (description.length <= limit) return description;
    var str = description.slice(0, limit);
    var a = str.split(" ");
    a.splice(a.length - 1, 1);
    str = a.join(" ");
    return str + "...";
  }

  render() {
    const { title, release_date, overview, vote_average, poster_path } = this.props.movie;
    
    return (
      <>
        <div className="img">
          <img
            src={
              poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : no_image
            }
            alt="poster"
          />
        </div>
        <div className="card">
          <h3 className="cardTitle">{title}</h3>
          <div className="rating">{vote_average}</div>
          <div className="date">
            {release_date ? format(parseISO(release_date), "MMMM d, yyyy") : "Not found"}
          </div>
          <div className="genres">
            <div className="genre">Action</div>
            <div className="genre">Drame</div>
          </div>
          <div className="description">{this.kitcut(overview, 150)}</div>
          <Rate
            style={{ fontSize: "14px", margin: "10px 0" }}
            value="null"
            className="rate"
            count={10}
            allowHalf
            allowClear={false}
            defaultValue={0}
          />
        </div>
      </>
    );
  }
}
