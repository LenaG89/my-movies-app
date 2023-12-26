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
  async getAllMovies() {
    const res = await this.getResource(`/search/movie?query=return&api_key=${this._apiKey}`);
    return res.results;
  }
 
};
