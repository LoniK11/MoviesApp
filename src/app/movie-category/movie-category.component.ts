import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { categoryList } from '../Models/categories';

@Component({
  selector: 'app-movie-category',
  templateUrl: './movie-category.component.html',
  styleUrls: ['./movie-category.component.css']
})
export class MovieCategoryComponent {

  constructor(
    private router: Router,
  ){}

  categoryList:string[] = categoryList;

  selectedCategory:string = '';

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
