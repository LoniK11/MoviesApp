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
        // console.log(movieArray)
        console.log(this.featuredMovie);
        console.log(movieArray);
        
        this.topRatedMovieArray = this.getTopRatedMovies(movieArray);
        
        this.trendingMovieArray = this.generateFeaturedMovie(0,movieArray)
        /* 
        // console.log(this.generateFeaturedMovie(0,this.topRatedMovieArray));
        
        console.log(this.generateFeaturedMovie(0,movieArray));
        this.trendingMovieArray = this.generateFeaturedMovie(0,movies) */
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
    /* for(let i = 0; i < movieArray.length; i++){
      for(let j = i + 1; j < movieArray.length; j++){
        if(movieArray[i].rating < movieArray[j].rating){
          let temp = movieArray[i].rating;
          movieArray[i].rating = movieArray[j].rating;
          movieArray[j].rating = temp;
        }
      } 
      console.log(movieArray[i].rating)
    } */
    const returnedArray = movieArray.sort((a,b) => b.rating - a.rating).slice(0,5);

    for(let i of returnedArray){
      console.log('Name: ' + i.name + ' | Rating: ' + i.rating )
    }

    return returnedArray;
  }

  generateFeaturedMovie(min: number, movieArray: MovieModel[]){
    
    // console.log(Math.floor(Math.random() * max));

    let tempMovieArray = movieArray;
    let returnArray:MovieModel[] = [];
   
    while (returnArray.length < 5 && tempMovieArray.length > 0) {
      let randomIndex = Math.floor(Math.random() * tempMovieArray.length);
      returnArray.push(tempMovieArray[randomIndex]);

      // Remove the selected movie from tempMovieArray
      //splice method modifies the selected array directly
      tempMovieArray = tempMovieArray.filter(movie => JSON.stringify(movie) !== JSON.stringify(tempMovieArray[randomIndex]))
    }
    
    return returnArray;
  }

}