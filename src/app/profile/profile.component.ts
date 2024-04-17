import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../Models/user.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy{

  currentUser!:User;
  private subscription!:Subscription;
  userForm!:FormGroup;
  edit:boolean = false;
  openSave:boolean = false;
  readonly:boolean = true;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private api:ApiService
  ){}

  ngOnInit(){
    this.userForm = new FormGroup({
      id: new FormControl(null),
      username: new FormControl(null,[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
      ]),
      email: new FormControl(null,[
        Validators.required,
        Validators.email,
        Validators.maxLength(40)
      ]),
      password: new FormControl(null,[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/[a-z]/),
        Validators.pattern(/.*\d.*\d.*\d.*/)
      ])
    })

    this.getUserFromUserArray();
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  getUserFromUserArray(){
    this.subscription = this.api.user$.subscribe(
      user => {
        this.currentUser = user;
        this.patchFormValue(this.currentUser);
      }
    )
  }

  patchFormValue(user: User){
    this.userForm.patchValue({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password
    })
  }

  logOut(){
    this.router.navigate(['']);
    this.api.getCurrentUser({id:'',username:'',email:'',password:''})
  }

  clickEdit(){
    this.edit = !this.edit
    this.readonly = false;
  }

  clickSave(){
    console.log(this.currentUser.password);
    console.log(this.userForm.get('password')?.value)
    if(this.currentUser.password === this.userForm.get('password')?.value){
      this.edit = !this.edit
      console.log(true);
    }else if(this.userForm.get('password')?.valid){
      this.edit = !this.edit
      this.openSaveOptions();
    }
  }

  openSaveOptions(){
    this.openSave = true;
  }

  closeSaveOptions(){
    this.openSave = false;
    this.readonly = true;
  }

  saveUserUpdatedPassword(){
    // console.log(this.userForm.value)

    const updatedUser:User = {
      id: this.userForm.get('id')?.value,
      username: this.userForm.get('username')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value
    }

    // this.api.getCurrentUser(updatedUser)
    // this.currentUser = updatedUser;

    console.log(JSON.stringify(this.userForm.value) === JSON.stringify(updatedUser))

    this.api.updateUser(updatedUser).subscribe(
      success => {
        alert('User password updates successfully!');
      },
      error => {
        alert('Failed to update user password')
      }
    )

    this.closeSaveOptions()
  }

  doNotSaveUserUpdatedPassword(){
    this.getUserFromUserArray();
    this.closeSaveOptions();
    console.log(this.currentUser);
    
  }


}
