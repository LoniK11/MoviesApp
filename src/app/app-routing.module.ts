import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedMoviesComponent } from './featured-movies/featured-movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AuthGuardService } from './Services/auth-guard-movie-name';
import { SelectedMovieCategoryComponent } from './selected-movie-category/selected-movie-category.component';
import { AuthGuardMovieCategoryService } from './Services/auth-guard-movie-category';
import { SearchedResultMoviesComponent } from './searched-result-movies/searched-result-movies.component';
import { AuthGuardSearchedDataService } from './Services/auth-guard-searched-data.service';
import { AddNewMovieComponent } from './add-new-movie/add-new-movie.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { LogInAuthService } from './Services/log-in-auth.service';

const routes: Routes = [
  {path:'',component:FeaturedMoviesComponent},
  {path:'movie/:name',component:MovieDetailsComponent,canActivate:[AuthGuardService]},
  {path:'category/:category',component:SelectedMovieCategoryComponent,canActivate:[AuthGuardMovieCategoryService]},
  {path:'search/:searchedData',component:SearchedResultMoviesComponent,canActivate:[AuthGuardSearchedDataService]},
  {path:'add-movie',component:AddNewMovieComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'sign-in',component:SignInComponent},
  {path:'profile/:id',component:ProfileComponent,canActivate:[LogInAuthService]},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
