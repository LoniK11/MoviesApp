import { Injectable } from '@angular/core';
import { Router,RouterStateSnapshot,ActivatedRouteSnapshot,CanActivate, UrlTree } from '@angular/router';

import { categoryList } from '../Models/categories';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardMovieCategoryService implements CanActivate{

  constructor(
    private router: Router,
    private authService: AuthServiceService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
  {
    
    const categoriesArray:string[] = categoryList;

    let found = false;
    const url = state.url;

    let selectedCategory: string = '';
    let currentURL: string = ''
    

    for(let category of categoriesArray){
      currentURL = state.url.slice(10,url.length).replace(/-/g,' ')
      if(currentURL === category){
        found = true;
        selectedCategory = category
        console.log(selectedCategory.replace(/\s+/g, '-'))
        break;
      }
      else{
        found = false;
      }
    }

    if(found && selectedCategory){
      console.log(true)
      return true;
    }else{
      console.log(false)
      this.router.navigate(['/'])
      return false;
    }

    
  }
}
