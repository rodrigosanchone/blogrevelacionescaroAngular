import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../services/theme.services';
import { ArticlesService } from '../../services/articles.services';
import { SearchResultsService } from '../../services/searchResult.services';
import { Article } from '../../models/article.model';
import { showResultService } from '../../services/showResult.services';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  change: boolean= true;
  articles1!: Article[]
  rutaActual: string = '';
  articles: Article[]=[];
  searchResults: any;
  activo!:boolean
  show!:boolean
  constructor(private aS:ArticlesService,
            private searchResultsService: SearchResultsService,
            private showRServices:showResultService,
            private router: Router,
            private tS: ThemeService) {
                 this.tS.currentChange.subscribe(change => this.change = change);
                 this.showRServices.activoChange.subscribe(show=>this.show=show)
                this.router.events.subscribe(val=>{

                  if(this.router.url=='/' || this.router.url=='/index'){
                    this.rutaActual = 'index'
                  }else{
                    this.rutaActual='control'
                  }

                })

              }
              ngOnInit() {

                this.aS.getArticlesLast().subscribe(
                  articles=>{
                      this.articles1= articles;
                     
                  }
                
                 )

                if(this.router.url=='/' || this.router.url=='/index'){
                  this.rutaActual = 'index'
                }else{
                  this.rutaActual='control'
                }

                this.searchResultsService.currentSearchResults.subscribe(results => {
                  this.searchResults = results;
                });

              }


  changeTheme(){
    this.change = !this.change;
    this.tS.changeTheme(this.change);

  }

  delete(article: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar esta entrada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.aS.deleteArticle(article);
        this.router.navigate(['/control']);
      }
    });
  }

  hide() {
    this.show= !this.show
     this.showRServices.change(this.show)
     

     this.aS.getArticlesLast().subscribe(
      articles=>{
          this.articles1= articles;
         
      }
    
     )

  }


}
