export default class MoviesDBService {
  _apiBase = "https://api.themoviedb.org/3";
  _apiKey = "df53b12b5f66be1778512572c0ce3c44";
  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, reseived ${res.status}`);
    }

    return await res.json();
  }
  async getAllMovies(movieName, page = 1) {
    const res = await this.getResource(
      `/search/movie?query=${movieName}&api_key=${this._apiKey}&page=${page}`
    );
    return res;
  }
  async getGuestSessionId() {
    const res = await this.getResource(
      `/authentication/guest_session/new?api_key=${this._apiKey}`
    );
    return res.guest_session_id;
  }

  async getSession(page) {
    const res = await this.getResource(
      `/guest_session/${localStorage.getItem("guest")}/rated/movies?api_key=${this._apiKey}&page=${page}`
    );

    return res;
  }
  async addMovieRatingStars(id, rating) {
    const url = `/movie/${id}/rating?api_key=${
      this._apiKey
    }&guest_session_id=${localStorage.getItem("guest")}`;
    const res = await fetch(`${this._apiBase}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ value: rating }),
    });
    if (!res.ok) {
      console.error(res);
      throw new Error(`Could not fetch ${url}, reseived ${res.status}`);
    }

    return res;
  }
  async getGenres() {
    const res = await this.getResource(`/genre/movie/list?api_key=${this._apiKey}&language=en`)

    return res.genres 
  }
}
