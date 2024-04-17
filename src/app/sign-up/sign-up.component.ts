import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  userForm!:FormGroup

  constructor(private api:ApiService){}

  ngOnInit(){

    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const atLeastThreeNumberRegex = /.*\d.*\d.*\d.*/;

    this.userForm = new FormGroup({
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
        Validators.pattern(upperCaseRegex),
        Validators.pattern(lowerCaseRegex),
        Validators.pattern(atLeastThreeNumberRegex)
      ])
    })
  }

  passwordType:string = 'password';
  count:number = 0;

  showPassword(){
    this.count ++;
    if(this.count % 2 === 1){
      this.passwordType = 'text'
    }else{
      this.passwordType = 'password'
    }
  }

  submitForm(){
    console.log(this.userForm.value)

    const newUser:User = {
      username: this.userForm.get('username')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value
    }

    this.api.getAllUsers().subscribe(
      users => {
        if(!this.checkUserDuplications(newUser,users)){
          this.api.createUser(newUser).subscribe(
            success => {
              alert('User created successfully!')
              this.userForm.reset()
            },
            error => {
              alert('Failed to create a new user!')
            }
          )
        }else{
          alert('User exists already!');
        }
      }
    )
  }

  checkUserDuplications(user: User,userArray: User[]){

    for(let u of userArray){
      if(
        u.username.toLowerCase() === user.username.toLowerCase() ||
        u.email.toLowerCase() === user.email.toLowerCase()
      ){
        return true;
      }
    }
    return false;
  }

}
