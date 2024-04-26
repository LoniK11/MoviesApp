import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModel } from './Models/movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Movies App';

  searchArrayResults:MovieModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ){}

}
