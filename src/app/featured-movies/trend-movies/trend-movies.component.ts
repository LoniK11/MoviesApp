import { Component, Input, OnInit } from '@angular/core';
import { MovieModel } from 'src/app/Models/movie.model';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-trend-movies',
  templateUrl: './trend-movies.component.html',
  styleUrls: ['./trend-movies.component.css']
})
export class TrendMoviesComponent implements OnInit{

  trendingList:string[] = ['Weekly Trending Movies','Top Rated Movies'];
  movieArray:MovieModel[] = [];
  topRatedMovieArray:MovieModel[] = [];
  trendingMovieArray:MovieModel[] = [];

  @Input() featuredMovie!: MovieModel;

  constructor(private api:ApiService){}

  ngOnInit(){
    this.api.getAllMoviesTwo().subscribe(
      movies => {
        const movieArray = movies.filter(movie => JSON.stringify(movie) !== JSON.stringify(this.featuredMovie))

        console.log(this.featuredMovie);
        console.log(movieArray);
        
        this.topRatedMovieArray = this.getTopRatedMovies(movieArray);
        
        this.trendingMovieArray = this.generateFeaturedMovie(0,movieArray)
        
      }
    ) 
  }

  getLength(movieArray: MovieModel[]){
    let count:any = 0;
    for(let i of movieArray){
      count += 190;
    }

    count = count - 10; 
    count = count.toString() + 'px';
    return count;
  }

  getTopRatedMovies(movieArray: MovieModel[]){
    const returnedArray = movieArray.sort((a,b) => b.rating - a.rating).slice(0,8);

    for(let i of returnedArray){
      console.log('Name: ' + i.name + ' | Rating: ' + i.rating )
    }

    return returnedArray;
  }

  generateFeaturedMovie(min: number, movieArray: MovieModel[]){
    let tempMovieArray = movieArray;
    let returnArray:MovieModel[] = [];
   
    while (returnArray.length < 5 && tempMovieArray.length > 0) {
      let randomIndex = Math.floor(Math.random() * tempMovieArray.length);
      returnArray.push(tempMovieArray[randomIndex]);

      tempMovieArray = tempMovieArray.filter(movie => JSON.stringify(movie) !== JSON.stringify(tempMovieArray[randomIndex]))
    }
    
    return returnArray;
  }

}