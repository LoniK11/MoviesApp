import { AfterViewChecked, ChangeDetectorRef, Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MovieModel } from '../Models/movie.model';
import { ApiService } from '../Services/api.service';
import { categoryList } from '../Models/categories';
import { Form, FormArray, FormArrayName, FormControl, FormGroup, Validators } from '@angular/forms';
import { urlValidator } from '../Models/urlValidator';

@Component({
  selector: 'app-add-new-movie',
  templateUrl: './add-new-movie.component.html',
  styleUrls: ['./add-new-movie.component.css']
})
export class AddNewMovieComponent implements OnInit{

  constructor(
    private api:ApiService,
    private cd: ChangeDetectorRef
  ){}

  @ViewChild('actorRef') actorRef!:ElementRef;
  @ViewChild('clipRef') clipRef!:ElementRef;

  categoryList:string[] = categoryList;
  yearArray:number[]=[1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024]
  movieForm!:FormGroup;

  insertCategory(category: string){
    if(this.categoryList.length > 0 && (this.movieForm.get('category') as FormArray)?.value.length < 5){ 
      (this.movieForm.get('category') as FormArray)?.push(new FormControl(category))
      this.categoryList = this.categoryList.filter(c => c !== category);
    }
  }

  removeCategory(categorySelected: string,index: number){
    (this.movieForm.get('category') as FormArray).removeAt(index);
    this.categoryList.push(categorySelected);
    this.categoryList = this.sortArrayAscending(this.categoryList)
  }

  getCategoryList(){
    return (this.movieForm.get('category') as FormArray)?.controls;
  }

  sortArrayAscending(arr: string[]){
    return arr.slice().sort((a, b) => a.localeCompare(b));
  }

  insertActor(actor: string){
    let newActor = new FormControl(actor,[Validators.required,Validators.minLength(7)]);
    if(newActor.valid && this.checkForDuplicates(actor,this.movieForm.get('cast')?.value) === true){
      (this.movieForm.get('cast') as FormArray).push(newActor)
      this.actorRef.nativeElement.value = ''
    }
  }

  removeActor(index: number){
    (this.movieForm.get('cast') as FormArray).removeAt(index)
  }

  getMovieFormCast(){
    return (this.movieForm.get('cast') as FormArray);
  }

  insertClip(clip: string){
    let newClip = new FormControl(clip,[Validators.required,Validators.minLength(8),urlValidator()]);
    if(newClip.valid && this.checkForDuplicates(clip,this.movieForm.get('clips')?.value)){
      (this.movieForm.get('clips') as FormArray).push(newClip);
      this.clipRef.nativeElement.value = '';
    }
  }

  removeClip(index: number){
    (this.movieForm.get('clips') as FormArray).removeAt(index);
  }

  getMovieFormClips(){
    return (this.movieForm.get('clips') as FormArray);
  }

  checkForDuplicates(value: string,array: any){
    if (array.length === 0) {
      return true; // Return true if array is empty
    }

    for(let val of array) {
      if (val === value) {
        return false; // Return false if duplicate found
      }
    }

    return true; 
  }

  checkForDuplicateMovies(movie: MovieModel,array: MovieModel[]){
    if (array.length === 0) {
      return true; // Return true if array is empty
    }

    for(let m of array) {
      if (m.name === movie.name && m.productionYear === movie.productionYear) {
        return false; // Return false if duplicate found
      }
    }

    return true; 
  }


  ngOnInit(){
    
    this.movieForm = new FormGroup({
      name: new FormControl(null,[Validators.required,Validators.minLength(3)]),
      description: new FormControl(null,[Validators.required,Validators.minLength(50)]),
      imageUrl: new FormControl(null,[Validators.required,urlValidator()]),
      backgroundImageUrl: new FormControl(null,[Validators.required,urlValidator()]),
      rating: new FormControl(null,[Validators.required,Validators.min(0),Validators.max(10)]),
      productionYear: new FormControl(null,[Validators.required,Validators.min(1980),Validators.max(2024)]),
      cast: new FormArray([],[Validators.required,Validators.minLength(2),Validators.maxLength(5)]),
      director: new FormControl(null,[Validators.required,Validators.minLength(7)]),
      category: new FormArray([],[Validators.required,Validators.minLength(2),Validators.maxLength(5)]),
      clips: new FormArray([],[Validators.required,Validators.minLength(1),Validators.maxLength(5)]),
      length: new FormControl(null,[Validators.required,Validators.min(50),Validators.max(180)])
    })

    
  }

  submitForm(){

    const newMovie:MovieModel = {
      name:this.movieForm.get('name')?.value,
      description:this.movieForm.get('description')?.value,
      imageUrl:[this.movieForm.get('imageUrl')?.value,this.movieForm.get('backgroundImageUrl')?.value],
      rating:this.movieForm.get('rating')?.value,
      productionYear:this.movieForm.get('productionYear')?.value,
      cast:this.sortArrayAscending(this.movieForm.get('cast')?.value),
      director:this.movieForm.get('director')?.value,
      category:this.sortArrayAscending(this.movieForm.get('category')?.value),
      clips:this.sortArrayAscending(this.movieForm.get('clips')?.value),
      length:this.movieForm.get('length')?.value
    }

    console.log(this.movieForm.get('category')?.value);
    
    this.api.getAllMoviesTwo().subscribe(
      movies => {
        if(this.checkForDuplicateMovies(newMovie,movies) === true){
          this.api.postMovie(newMovie).subscribe(
            success => {
              console.log("Movie posted succesfully!");
              alert("Movie added successfully!");
              (this.movieForm.get('category') as FormArray).clear();
              (this.movieForm.get('cast') as FormArray).clear();
              (this.movieForm.get('clips') as FormArray).clear();
              this.movieForm.reset();
            },
            error => {
              console.log("Movie failed");
              alert("Movie failed to add!");
            }
          )
        }else{
          console.log('Movie already exists')
          alert('Movie already exists')
    
        }
      }
    )

    console.log(newMovie)
  }
}
