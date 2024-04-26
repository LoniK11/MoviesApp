import { Injectable } from '@angular/core';
import { MovieModel } from '../Models/movie.model';
import { ActivatedRouteSnapshot, Router,RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardSearchedDataService {
  constructor(
    private router: Router
  ){}

  canActivate(
    next:ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ){

    const url = state.url

    let found = false;
    let movie1!: MovieModel;
    let currentURL: string = ''

    found = true;
    console.log(url.replace(/%20/g, ' ').slice(8,url.length))
    const trimmedUrl = (url.replace(/%20/g, ' ').slice(8,url.length))

    if(trimmedUrl.length > 2){
      return true;
    }else{
      this.router.navigate(['/'])
      return false;
    }
   
  }

}
