import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'MyMovies';
  tableHeaders = [];
  movies = new Array();

  years = [];
  genres = [];

  selectedYears = [];
  selectedGenres = [];

  selectedFilter: string;
  genresState: boolean = true;
  yearsState: boolean = true;
  
  constructor(private service : AppServiceService) {
    
  }

  ngOnInit(): void {
    this.getMoviesFromAPI();
    this.getMovieYearsFromAPI();
    this.getMovieGenresFromAPI();
  }

  getMoviesFromAPI() {
    this.movies = []
    this.service.getMovies().subscribe((response : any) => {
      console.log(response)
      let jsonObj : any = JSON.parse(response.data)
      this.tableHeaders = JSON.parse(response.tableHeader)[0]
      for(let i = 0; i< jsonObj.length; i++) {
        let m = jsonObj[i];
        this.movies.push(m)
      }
    }, (error) => {
      console.log("Error is ", error);
    })
  }

  getMovieYearsFromAPI() {
    this.service.getMovieYears().subscribe((response : any) => {
      this.years = JSON.parse(response.data)
    })
  }

  getMovieGenresFromAPI() {
    this.service.getMovieGenres().subscribe((response : any) => {
      this.genres = JSON.parse(response.data)
    })
  }

  getMoviesFilteredByYearsFromAPI() {
    this.movies = []
    this.service.getMoviesFilteredByYears(this.selectedYears).subscribe((response : any) => {
      console.log(response)
      let jsonObj : any = JSON.parse(response.data)
      this.tableHeaders = JSON.parse(response.tableHeader)[0]
      for(let i = 0; i< jsonObj.length; i++) {
        let m = jsonObj[i];
        this.movies.push(m)
      }
    }, (error) => {
      console.log("Error is ", error);
    })
  }

  getMoviesFilteredByGenresFromAPI() {
    this.movies = []
    this.service.getMoviesFilteredByGenres(this.selectedGenres).subscribe((response : any) => {
      console.log(response)
      let jsonObj : any = JSON.parse(response.data)
      this.tableHeaders = JSON.parse(response.tableHeader)[0]
      for(let i = 0; i< jsonObj.length; i++) {
        let m = jsonObj[i];
        this.movies.push(m)
      }
    }, (error) => {
      console.log("Error is ", error);
    })
  }

  onSelectYearChange(value) {
    this.selectedYears.push(value)
    this.getMoviesFilteredByYearsFromAPI();
  }

  onSelectGenreChange(value) {
    this.selectedGenres.push(value)
    this.getMoviesFilteredByGenresFromAPI();
  }

  deleteFilter(filter) {
    this.selectedYears = this.selectedYears.filter(elem => elem !== filter.parentElement.firstChild.innerHTML);
    this.selectedGenres = this.selectedGenres.filter(elem => elem !== filter.parentElement.firstChild.innerHTML);
    if(this.selectedYears.length === 0 && this.selectedGenres.length === 0) {
      this.getMoviesFromAPI();
      return;
    }
    switch (this.selectedFilter) {
      case 'years':
        this.getMoviesFilteredByYearsFromAPI();
        break;
      case 'genres':
        this.getMoviesFilteredByGenresFromAPI();
        break;
      default:
        break;
    }
  }
  
  setRadio(e: string): void {  
    this.selectedFilter = e;
    switch (this.selectedFilter) {
      case 'years':
        this.selectedGenres = [];
        this.yearsState = false;
        this.genresState = true;
        break;
      case 'genres':
        this.selectedYears = [];
        this.genresState = false;
        this.yearsState = true;
        break;
    
      default:
        break;
    }
    this.getMoviesFromAPI();
  }
   
}

