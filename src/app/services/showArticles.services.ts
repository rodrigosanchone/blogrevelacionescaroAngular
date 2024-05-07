

/**Este archivo maneja el cambio en una variables para mostrar o no los articulos completos y los resultados de las busquedas  */

import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class showArticlesService {
  private changeSource = new BehaviorSubject<boolean>(true);
  activoChange = this.changeSource.asObservable();

  constructor() { }

  change(activo: boolean) {
    this.changeSource.next(activo);

  }

}
