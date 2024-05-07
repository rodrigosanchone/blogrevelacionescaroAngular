import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {LoginServices} from '../../services/login.services'
import Swal from 'sweetalert2'
/* import {  showArticlesService } from '../../services/showArticles.services'; */
import { ThemeService } from '../../services/theme.services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit  {
  change=true;
  email:string="";
  password:string="";
 /*  activo!:boolean; */
  searchResults: any;
  constructor(
   /*  private showRS:showArticlesService, */
   private tS: ThemeService,
    private router: Router,
    private loginService:LoginServices,
  ) {
    this.tS.currentChange.subscribe(change=>this.change=change)
  }
  ngOnInit(): void {
   /*  this.showRS.activoChange.subscribe(activo=>this.activo) */
   /*  console.log('en login esta ',this.activo) */
    this.loginService.getAuth().subscribe(
      auth=>{
        if(auth){
          this.router.navigate(['/control']);
        }
      }  )
  }
  login(){
    this.loginService.login(this.email,this.password).then(
      res=>{
        this.router.navigate(['/control']);
      }
    ).catch(
      error=>{
        Swal.fire({
          title: 'Error!',
          text: 'El usuario o contraseña estan mal',
          icon: 'error',
          confirmButtonText: 'Volver'
        })
      }
    )}
}
