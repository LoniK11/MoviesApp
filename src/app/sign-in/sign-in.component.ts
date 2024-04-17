import { Component } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  userForm!:FormGroup;
  passwordType:string = 'password';
  count:number = 0;

  constructor(
    private api:ApiService,
    private router: Router
  ){}

  ngOnInit(){
    this.userForm = new FormGroup({
      email: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required])
    })
  }

  showPassword(){
    this.count ++;
    if(this.count % 2 === 1){
      this.passwordType = 'text'
    }else{
      this.passwordType = 'password'
    }
  }

  submitForm(){
    const currentUser = {
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value
    }

    let found = false;

    let username = '';
    let user1!: User; 

    this.api.getAllUsers().subscribe(
      users => {
        for(let u of users){
          if(u.email.toLowerCase() === currentUser.email.toLowerCase() && u.password === currentUser.password){
            found = true;
            username = u.username;
            user1 = u
            break;
          }else{
            found = false;
          }
        }

        if(found){
          alert('Welcome, ' + username + '!');
          this.api.getCurrentUser(user1)
          this.router.navigate(['/profile',user1.id])
        }else{
          alert('Couldn\'t find user!');
        }
      }
    )

  }

}
