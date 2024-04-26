import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieModel } from '../Models/movie.model';
import { User } from '../Models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl:string = 'http://localhost:3000'; 

  constructor(private http:HttpClient) { }

  postMovie(movie: MovieModel){
    return this.http.post(`${this.apiUrl}/movies`,movie)
  }

  getAllMoviesTwo(){
    return this.http.get<MovieModel[]>(`${this.apiUrl}/movies`)
  }

  deleteMovie(movie: MovieModel){
    return this.http.delete(`${this.apiUrl}/movies/${movie.id}`)
  }

  createUser(user: User){
    return this.http.post<User>(`${this.apiUrl}/users`,user);
  }

  getAllUsers(){
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  updateUser(user: User){
    return this.http.put(`${this.apiUrl}/users/${user.id}`,user);
  }

  userSubject:BehaviorSubject<User> = new BehaviorSubject<User>({
    id:'',
    username:'',
    email:'',
    password:''
  });
  user$:Observable<User> = this.userSubject.asObservable();

  getCurrentUser(user: User){
    this.userSubject.next(user)
  }

  deleteCurrentUser(user: User){
    return this.http.delete(`${this.apiUrl}/users/${user.id}`);
  }
}