import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MovieModel } from 'src/app/Models/movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {

  constructor(
    private router:Router
  ){}

  @Input() movie!:MovieModel;

  onMovieNameClick(){
    // console.log(this.movie)
    const formattedMovieName = this.movie.name.replace(/\s+/g, '-');

    this.router.navigate(['/movie', formattedMovieName]);
  }

}