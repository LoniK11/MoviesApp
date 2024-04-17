import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MovieModel } from '../Models/movie.model';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-featured-movies',
  templateUrl: './featured-movies.component.html',
  styleUrls: ['./featured-movies.component.css']
})
export class FeaturedMoviesComponent implements OnInit {

  imgUrl:string = '';
  featuredMovie:MovieModel = {
    name:'',
    description:'',
    imageUrl:[],
    rating:0,
    productionYear:0,
    cast:[],
    director:'',
    category: [],
    clips:[],
    length:0
  }

  constructor(
    private http: ApiService,
    private router: Router 
  ){}

  ngOnInit(){
    this.http.getAllMoviesTwo().subscribe(
      movies => {
        this.featuredMovie = movies[this.generateFeaturedMovie(0, movies.length)];
        if(this.featuredMovie.imageUrl){
          this.imgUrl = this.featuredMovie.imageUrl[1];
        }
      }
    )
  }

  generateFeaturedMovie(min: number, max: number){
    return Math.floor(Math.random() * max);
  }

  watchFeaturedMovie(){
    const formattedMovieName = this.featuredMovie.name.replace(/\s+/g, '-');
    console.log(this.featuredMovie.name.replace(/\s+/g, '-'))

    if(formattedMovieName){
      this.router.navigate(['/movie', formattedMovieName]);
    }
  }
}
