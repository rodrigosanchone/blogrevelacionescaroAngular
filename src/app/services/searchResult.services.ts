
/**AQUÍ MANDA LOS RESULATDOS QUE SE OBTIENE DEL BOTON SEARCH DEL HEADER AL COMOPONETE QUE MUESTRA LOS
 * RESULTADOS DE LA BUSQUEDA
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {
  private searchResults = new BehaviorSubject<any>(true);
  currentSearchResults = this.searchResults.asObservable();

  constructor() { }

  changeSearchResults(results: any) {
    this.searchResults.next(results);

  }
}
