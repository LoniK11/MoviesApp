import { Component, OnInit, Input, AfterViewChecked, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieModel, } from 'src/app/Models/movie.model';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-movie-suggestions',
  templateUrl: './movie-suggestions.component.html',
  styleUrls: ['./movie-suggestions.component.css']
})
export class MovieSuggestionsComponent implements OnInit,OnDestroy{

  movieArray:MovieModel[] = [];
  private subscription!: Subscription;
  selectedMovie!: MovieModel;

  constructor(
    private http: ApiService,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.http.getAllMoviesTwo().subscribe(
      movies => {
        this.subscription = this.route.params.subscribe(
          params => {
            const movieName = params['name'].replace(/-/g,' ');
            // console.log(movieName)
            for(let movie of movies){
              if(movie.name === movieName){{
                this.selectedMovie = movie;
                break;
              }}
            }
            this.movieArray = movies.filter(movie => movie.name !== this.selectedMovie.name)
          }
        )
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  getLength(){
    let count:any = 0;
    for(let i of this.movieArray){
      count += 192;
    }

    count = count - 12; 
    count = count.toString() + 'px';
    return count;

  }

}
