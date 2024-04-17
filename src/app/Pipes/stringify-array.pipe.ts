import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringifyArray'
})
export class StringifyArrayPipe implements PipeTransform {

  transform(value: string[]){
    let returnValue:string = '';

    for(let val of value){
      returnValue += val.charAt(0).toUpperCase() + val.substring(1,val.length) + ', ';
    }

    return returnValue.slice(0,returnValue.length-2);
  }

}
