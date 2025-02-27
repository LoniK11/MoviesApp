import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieModel } from '../Models/movie.model';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-selected-movie-category',
  templateUrl: './selected-movie-category.component.html',
  styleUrls: ['./selected-movie-category.component.css']
})
export class SelectedMovieCategoryComponent implements OnInit,OnDestroy{

  private subscription!:Subscription;
  categoryString:string = '';
 
  movieArray:MovieModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: ApiService
  ){}

  ngOnInit(){
    this.http.getAllMoviesTwo().subscribe(
      movies => {
        this.getMoviesByCategory(movies)
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  getMoviesByCategory(movies: MovieModel[]){
    this.subscription = this.route.params.subscribe(
      params => {
        const category = params['category'];
        this.categoryString = 'Selected Category: ' + category.charAt(0).toUpperCase() + category.substring(1,category.length);
        // console.log(category);

        this.movieArray = movies.filter(movie => movie.category.includes(category.toLowerCase())) 
      }
    )
  }

}
