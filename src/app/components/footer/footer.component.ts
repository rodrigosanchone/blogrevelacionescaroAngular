import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.services';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  date=new Date()
  year=this.date.getFullYear();
  change=true;
  constructor(private tS: ThemeService){
    this.tS.currentChange.subscribe(change => this.change = change);

  }
}
