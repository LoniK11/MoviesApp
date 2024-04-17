import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { User } from '../Models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LogInAuthService implements CanActivate{

  private subscription!:Subscription;
  user!:User;
  userArray:User[] = [];

  constructor(
    private api: ApiService,
    private router: Router
  ){}

  async canActivate(){

    this.user = await this.api.user$.pipe(take(1)).toPromise() as any;
    this.userArray = await this.api.getAllUsers().toPromise() as User[];    

    console.log((this.user));

    let found = false;

    for(let user of this.userArray){
      if(
        user.email.toLowerCase() === this.user.email.toLowerCase() &&
        user.password === this.user.password
      ){
        found = true;
        console.log(true);
        break;
      }
    }

    if (found === true) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
