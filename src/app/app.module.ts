import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeaturedMoviesComponent } from './featured-movies/featured-movies.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MovieCategoryComponent } from './movie-category/movie-category.component';
import { TrendMoviesComponent } from './featured-movies/trend-movies/trend-movies.component';
import { MovieComponent } from './featured-movies/trend-movies/movie/movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieSuggestionsComponent } from './movie-details/movie-suggestions/movie-suggestions.component';

import { StringifyArrayPipe } from './Pipes/stringify-array.pipe';
import { ShowExceptSelectedPipe } from './Pipes/show-except-selected.pipe';
import { SelectedMovieCategoryComponent } from './selected-movie-category/selected-movie-category.component';
import { SearchedResultMoviesComponent } from './searched-result-movies/searched-result-movies.component';
import { AddNewMovieComponent } from './add-new-movie/add-new-movie.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    FeaturedMoviesComponent,
    SearchBarComponent,
    MovieCategoryComponent,
    TrendMoviesComponent,
    MovieComponent,
    MovieDetailsComponent,
    MovieSuggestionsComponent,
    StringifyArrayPipe,
    ShowExceptSelectedPipe,
    SelectedMovieCategoryComponent,
    SearchedResultMoviesComponent,
    AddNewMovieComponent,
    SignUpComponent,
    SignInComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
