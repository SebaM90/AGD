import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entidadesHtml'
})
export class EntidadesHtmlPipe implements PipeTransform {

  transform(value: string): string {
    let aux:string = value
    aux = aux.split('&lt;p&gt;').join('') // "<p>"
    aux = aux.split('&lt;/p&gt;').join('')  // "</p>"
    aux = aux.split('&lt;br /&gt;').join('\n')  // "<b />"
    return aux
  }

}
