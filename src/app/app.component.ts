import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModel } from './Models/movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MoviesApp';

  searchedData:string = '';

  searchArrayResults:MovieModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ){
  console.log("HEllow")
  }

  /*list:any[]=['star1','star2','star3','star4','star5'];

  starRating:any;

  avgRating:any[] = [];

  showRating(){
    this.avgRating.push(parseInt(this.starRating));

    let sum = 0
    let count = 0;
    for(let i of this.avgRating){
      sum += i;
      count++;
    }  

    alert(sum/count)
  }

  getValue(event: any){
    this.starRating = event.target.value
  }*/

  ngOnInit(){
    
    
  }
  
  getCurrentUrl(){
    let currentURL:string = ''
    this.route.snapshot.url.map(segment => {
      console.log(segment.path)
    })
    
  }

  searchedDataBackground: string = '';

  getSearchedResults(data: any){
    if(data){
      this.searchArrayResults = data;
    }
  }

}
