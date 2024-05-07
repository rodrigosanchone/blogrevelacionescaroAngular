import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../services/theme.services';
import { ArticlesService } from '../../services/articles.services';
import { SearchResultsService } from '../../services/searchResult.services';
import { showResultService } from '../../services/showResult.services';
import { LoginServices } from '../../services/login.services';
import { Article } from '../../models/article.model';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  bannerActivo: boolean = true;
  articles$!: Observable<Article[]>;
  articles!: Observable<Article[]>;
  searchResults: any;
  rutaActual: string = "";
  change: boolean = true;
  active!: boolean;
  searchTerm!: string;
  isLoggedIn!: boolean;
  loggedInUser!: string | null;
  show!: boolean
  articles1!: Article[]
  constructor(private router: Router,
    private searchResultsService: SearchResultsService,
    private showRServices: showResultService,
    private aR: ActivatedRoute,
    private tS: ThemeService,
    private loginService: LoginServices,
    private aS: ArticlesService) {

    this.router.events.subscribe((val) => {
      if (this.router.url === '/index' || this.router.url === '/' || this.router.url === '/control') {
        this.rutaActual = 'index';
      } else {
        this.rutaActual = 'otraRuta';
      }

    });
  }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;

        this.loggedInUser = auth.email


      }
      else {
        this.isLoggedIn = false;
      }
    });

  
  }

  logOut() {
    this.hide()
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  searchArticles() {


    this.bannerActivo = false

    function capitalize(str: string) {
      return str.toUpperCase();
    }
    console.log(capitalize(this.searchTerm))
    this.aS.buscarArticulosPorTitulo(capitalize(this.searchTerm)).subscribe((results) => {
      const searchResults = results;
      if (capitalize(this.searchTerm) == " " || results.length < 1) {
        if (capitalize(this.searchTerm) == " ") {
          Swal.fire({
            title: 'Lo siento',
            text: 'Debe ingresar un termino para la busqueda',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
          })
          
        }
        if (results.length < 1) {
          Swal.fire({
            title: 'Lo siento',
            text: 'No se encontro ningún resultado',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
          })
         
        }
      } else {
        this.searchResultsService.changeSearchResults(searchResults);
        this.show = !this.show
        this.showRServices.change(this.show)
        this.searchTerm = ""
      }
     
    });
   
  }



  changeTheme() {
    this.change = !this.change;
    this.tS.changeTheme(this.change);

  }
  hide() {
    this.show = true
    this.showRServices.change(this.show)
  

  }

}
