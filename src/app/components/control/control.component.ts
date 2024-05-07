import { Component } from '@angular/core';
import {  showResultService } from '../../services/showResult.services';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent {


  constructor(private showRS:showResultService,
    private router: Router,
    private aR: ActivatedRoute,
    ){

  }
}
