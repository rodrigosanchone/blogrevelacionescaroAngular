import { Component } from '@angular/core';
import { ThemeService } from './services/theme.services';
import {  showResultService } from './services/showResult.services';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'revelacionesdecaro';
  change=true;
  show!:boolean
  rutaActual=""
  constructor(private tS: ThemeService,
    private titleService:Title,
    private metaService: Meta,
    private showRS:showResultService){
      this.showRS.activoChange.subscribe(show=>this.show=show);

      this.tS.currentChange.subscribe(change=>this.change=change)

  }

   ngOnInit() {
  
    this.titleService.setTitle(this.title);
  }

  
}
