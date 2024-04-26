import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot,RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { MovieModel } from '../Models/movie.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate,OnInit{

  movieArray:MovieModel[] = []

  constructor(
    private router: Router,
    private api: ApiService
  ){
    
  }

  ngOnInit(){
    console.log(this.movieArray)
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ){

    const url = state.url

    let found = false;
    let movie1!: MovieModel;
    let currentURL: string = ''
    
    this.movieArray = await this.api.getAllMoviesTwo().toPromise() as MovieModel[];

    for(let movie of this.movieArray){
      currentURL = state.url.slice(7,url.length).replace(/-/g,' ')
      if(movie.name === currentURL){
        found = true;
        movie1 = movie;
        // console.log(movie1.name.replace(/\s+/g, '-'))
        break;
      }
      else{
        found = false;
      }
    }

    if(found && movie1){
      return true;
    }else{
      this.router.navigate(['/'])
      return false;
    }

  }

}
