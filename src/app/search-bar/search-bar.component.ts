import { Component, Input, OnInit, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MovieModel } from '../Models/movie.model';
import { ApiService } from '../Services/api.service';
import { User } from '../Models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{

  @Input() searchedData:string = '';

  private subscription!:Subscription;
  currentUser!:User;
  movieArray:MovieModel[] = [];
  searchedMovieArray:MovieModel[] = [];
  hidden:boolean = true;

  constructor(
    private router:Router,
    private api: ApiService,
    private elementRef: ElementRef
  ){}

  ngOnInit() {
     
  }

  //Hides search results when clicked outside of their div
  @HostListener('document:click',['$event.target']) onClick(target: any){
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.hidden = true;
      this.searchedData = '';
    }
  }

  getBackToMain(){
    this.router.navigate(['/']);
  }

  filterMovieArrayBySearch(){
    this.api.getAllMoviesTwo().subscribe(
      movies => {
        this.searchedMovieArray = movies.filter(movie => movie.name.toLowerCase().includes(this.searchedData.toLowerCase()));
      }
    )  
   
    if(this.searchedData.length >= 3){
      this.hidden = false;
    }
  }

  clickSearchButton(){
    this.router.navigate(['/search/', this.searchedData],);
    this.searchedData = '';
  }

  goToSearchedMovie(name: string){
    const formattedMovieName = name.replace(/\s+/g, '-');
    this.router.navigate(['/movie/',formattedMovieName]);
    this.searchedData = ''
    this.hidden = true;
  }

  clickProfile(){
    this.subscription = this.api.user$.subscribe(
      user => {
        console.log(user)
        if(user !== null || user){
          this.router.navigate(['/profile',user.id]);
        }
      }
    )
  }

}
