import { Component} from '@angular/core';
import { ThemeService } from '../../services/theme.services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
 
  title = 'Sobremi';
 
  change:boolean=true;
  constructor(private tS: ThemeService,
    private titleService:Title,

    ){
   
      this.tS.currentChange.subscribe(change => this.change = change);
     
    
      
    }

 

    ngOnInit() {
      this.titleService.setTitle(this.title);
      
    
    }


  }

 
 

