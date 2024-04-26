import { Component, ElementRef, ViewChild, HostListener, OnInit, OnDestroy, AfterViewChecked, AfterViewInit, AfterContentChecked } from '@angular/core';
import { SafeResourceUrl ,DomSanitizer } from '@angular/platform-browser';
import { MovieModel } from '../Models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../Services/api.service';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy, AfterViewChecked {

  url:string = '';
  imageUrl:string =''

  currentUser!:User;
  userCheck:boolean = false;
  movieHidden:boolean = false;

  private subscription!:Subscription;
  movieArray:MovieModel[] = [];

  movie!:MovieModel;

  @ViewChild('secondContainer') secondContainer ?: ElementRef = new ElementRef('');
  @ViewChild('backScroll') backScroll?: ElementRef = new ElementRef('');
  @ViewChild('backgroundScroll') backgroundScroll?: ElementRef = new ElementRef('');


  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router:Router,
    private api:ApiService
  ){}
  
  ngOnInit(){
    this.api.getAllMoviesTwo()
    .subscribe(
      (movies:MovieModel[]) => {
        for(let movie of movies){
          movie.clips = movie.clips.map(clip => this.getSafeVideoUrl(clip) as string)
        }
        console.log(movies)

        this.getCurrentMovieUrl(movies)
      }
    )

    this.subscription = this.api.user$.subscribe(
      user => {
        this.currentUser = user;
        this.userCheck = this.checkForUser(this.currentUser);
      }
    )
  }


  ngAfterViewChecked(){
    if(
      this.backScroll?.nativeElement !== undefined &&
      this.backgroundScroll?.nativeElement !== undefined &&
      this.secondContainer?.nativeElement !== undefined
    ) {
      this.backScroll.nativeElement.scrollTop = 0
      this.backgroundScroll.nativeElement.scrollTop = 0;
      this.secondContainer.nativeElement.scrollTop = 0
    }
  }

  checkForUser(user: User){
    if(user.id){
      if(user.id?.length > 0){
        return true;
      }
    }
    return false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  getClipNumber(){
    let count = 0;
    for(let i of this.movie.clips){
      count++;
    }
    return count;
  }

  getSafeVideoUrl(videoUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  getCurrentRoute(){
    this.subscription = this.route.url.subscribe(segments => 
      console.log(segments.map((segment) => segment.path).join('/'))
    )
  }

  getCurrentMovieUrl(movies: MovieModel[]){
    this.subscription = this.route.params.subscribe(
      params => {
        const movieName = params['name'].replace(/-/g,' ');

        for(let movie of movies){
          if(movieName === movie.name){
            this.movie = movie;
            break;
          }
        }
      }
    )
  }

  deleteCurrentMovie(){
    const url = (this.route.snapshot.params['name'].replace(/-/g,' '))

    console.log(this.route.snapshot.params['name'].replace(/-/g,' '))
    this.api.getAllMoviesTwo().subscribe(
      movies => {
        for(let movie of movies){
          if(movie.name === url){
            console.log(true);
            this.api.deleteMovie(movie).subscribe(
              success => {
                alert("Movie \'" + movie.name + "\' deleted successfully!")
                this.router.navigate([''])
              },
              error => {
                alert("Movie \'" + movie.name + "\' failed to delete!")
              }
            )
          }else{
            console.log(false);
          }
        }
      }
    )
  }

}
