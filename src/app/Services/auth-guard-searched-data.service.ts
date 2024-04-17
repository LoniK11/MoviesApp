import { Injectable } from '@angular/core';
import { MovieModel } from '../Models/movie.model';
import { AuthServiceService } from './auth-service.service';
import { Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardSearchedDataService {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
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
    

    /* for(let movie of movieModelArray){
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
 */
  }

}
