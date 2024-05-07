import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class showResultService {
  private changeSource = new BehaviorSubject<boolean>(true);
  activoChange = this.changeSource.asObservable();

  constructor() { }

  change(show: boolean) {
    this.changeSource.next(show);

  }

}
