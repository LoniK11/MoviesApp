import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { categoryList } from '../Models/categories';
import { Subscription } from 'rxjs';
import { ApiService } from '../Services/api.service';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-movie-category',
  templateUrl: './movie-category.component.html',
  styleUrls: ['./movie-category.component.css']
})
export class MovieCategoryComponent {

  categoryList:string[] = categoryList;
  selectedCategory:string = '';
  private subscription!:Subscription;
  currentUser!:User

  constructor(
    private router: Router,
    private api: ApiService
  ){}

  ngOnInit(){
    this.subscription = this.api.user$.subscribe(
      user => {
        this.currentUser = user;
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe
  }

  countCategories(){
    let count = 0;
    for( let c of this.categoryList){
      count ++;
    }
    return count;
  }

  getCategory(event: any){
    this.selectedCategory = event.target.innerText.toLowerCase();
    console.log(this.selectedCategory)
    
    this.router.navigate(['/category',this.selectedCategory]);
  }

  navigateToAddMovie(){
    this.router.navigate(['/add-movie']);
  }

}
