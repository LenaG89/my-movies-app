import { Component } from "react";

export default class GuestSession extends Component {
  _apiBase = `https://api.themoviedb.org`;
  _apiKey = `df53b12b5f66be1778512572c0ce3c44`;

  async getGuestSessionId() {
    const url = `/3/authentication/guest_session/new&api_key=${this._apiKey}`;
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, reseived ${res.status}`);
    }
    const resultJson = await res.json();
    return await resultJson.guest_session_id;
  }

  async getSession(guestSessionId, page = 1) {
    const url = `/3/guest_session/${guestSessionId}/rated/movies&api_key=${this._apiKey}&page=${page}&sort_by=created_at.asc`;
    const res = await fetch(`${this._apiBase}${url}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, reseived ${res.status}`);
    }
    return await res.json();
  }
  async addMovieRatingStars(guestSessionId, id, rating) {
    const url = `/3/movie/${id}/rating&api_key=${this._apiKey}&guest_session_id=${guestSessionId}`;
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ value: 4 }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      
    });
    if (!res.ok) {
      console.error(res)
      throw new Error(`Could not fetch ${url}, reseived ${res.status}`);
    }
   
    return  res;
  }
}
