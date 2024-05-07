import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private changeSource = new BehaviorSubject<boolean>(true);
  currentChange = this.changeSource.asObservable();

  constructor() { }

  changeTheme(change: boolean) {
    this.changeSource.next(change);
  }
}
