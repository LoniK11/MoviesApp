import { Pipe, PipeTransform } from '@angular/core';
import { MovieModel } from '../Models/movie.model';

@Pipe({
  name: 'showExceptSelected'
})
export class ShowExceptSelectedPipe implements PipeTransform {

  transform(value: MovieModel[], selectedMovie:MovieModel): MovieModel[] {
    return value.filter(movie => JSON.stringify(movie) !== JSON.stringify(selectedMovie));
  }

}
