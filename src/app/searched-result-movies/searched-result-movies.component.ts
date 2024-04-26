import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieModel } from '../Models/movie.model';
import { Subscription } from 'rxjs';
import { ApiService } from '../Services/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-searched-result-movies',
  templateUrl: './searched-result-movies.component.html',
  styleUrls: ['./searched-result-movies.component.css']
})
export class SearchedResultMoviesComponent implements OnInit,OnDestroy{

  movieArray:MovieModel[] = [];
  searchedData:string = '';
  private subscription!:Subscription;

  constructor(
    private http: ApiService,
    private route: ActivatedRoute
  ){}
  ngOnInit(){
    this.http.getAllMoviesTwo().subscribe(
      movies => {
        this.getSearchedData(movies)
        console.log(this.searchedData);
      }
    )
/* 
    this.subscription = this.route.params.subscribe(
      params => {
        this.searchedData = params['searchedData']
      }
    ) */
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  getSearchedData(movies: MovieModel[]){
    this.subscription = this.route.params.subscribe(
      (url: Params) => {
        const searched = url['searchedData'];
        this.movieArray = movies.filter(movie => movie.name.toLowerCase().includes(searched.toLowerCase()))
        this.searchedData = searched
      }
    )
  }

}
