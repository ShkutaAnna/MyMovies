import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http : HttpClient) { }

  getMovies() {
    return this.http.get('/api/movies');
  }

  getMoviesFilteredByYears(years : Array<number>) {
    let query = '/api/moviesFilteredByYears'
    if(years.length > 0) {
      query += `?amount=${years.length}`
    }
    for(let i = 0; i < years.length; i++) {
      query += `&year${i+1}=${years[i]}`
    }
    return this.http.get(query)
  }

  getMoviesFilteredByGenres(genres : Array<string>) {
    let query = '/api/moviesFilteredByGenres'
    if(genres.length > 0) {
      query += `?amount=${genres.length}`
    }
    for(let i = 0; i < genres.length; i++) {
      query += `&genre${i+1}=${genres[i]}`
    }
    return this.http.get(query)
  }

  getMovieYears() {
    return this.http.get('/api/years');
  }

  getMovieGenres() {
    return this.http.get('/api/genres');
  }
}