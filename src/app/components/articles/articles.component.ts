import { Component } from '@angular/core';
import { Article } from '../../models/article.model';
import { ArticlesService } from '../../services/articles.services';
import { ThemeService } from '../../services/theme.services';
import { Router,ActivatedRoute } from '@angular/router';
import { LoginServices } from '../../services/login.services';

import Swal from 'sweetalert2'
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {

  loggedInUser!: string |null;
  isLoggedIn!: boolean;
  change:boolean=true;
  show!:boolean
  rutaActual: string = '';
  articles: Article[]=[];
  article!: Article;
  articles1!: Article[]
  id:string="";
  searchTerm=""
  p: number = 1;
  maxSize:number=0
  total!:number
  searchResults: any;
  rutaHeader: string=""


  constructor(private aS: ArticlesService,
    private tS: ThemeService,
    private router: Router,
    private aR: ActivatedRoute,
    private loginService: LoginServices,
    private titleService:Title,
    private metaService: Meta,


    ){ 

     

         
      this.tS.currentChange.subscribe(change => this.change = change);
      this.router.events.subscribe(val=>{
         if(this.router.url=='/' || this.router.url=="/index"){
          this.rutaActual = 'index'
        }else{
          this.rutaActual = 'otra'
        }
      })


     
    }
   

  
    ngOnInit():void{
     
      this.updateMetaTags();
      this.aS.getArticlesLast().subscribe(
        articles=>{
            this.articles1= articles;
           
        }
      
       )
      
      this.titleService.setTitle('revelacionesdecaro');
      this.loginService.getAuth().subscribe(auth=>{
        if(auth){
          this.isLoggedIn = true;

          this.loggedInUser = auth.email


        }
        else{
          this.isLoggedIn= false;
        }
      });
      if(this.router.url=='/control' ){
        this.rutaActual = 'control'
      }else{
        this.rutaActual = 'otra'
      }
        
       
    }

    ngAfterViewInit(): void{

      this.aS.getArticlesLast().subscribe(
        articles=>{
            this.articles1= articles;
          
        }
      
       )
       this.aS.getArticles().subscribe(
        articles=>{
          this.articles= articles;
          
        }
      )
     
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
    } updateMetaTags(){
      
      this.metaService.updateTag({ name: 'title', content: "Revelaciones de Caro"});
      this.metaService.updateTag({ name: 'description', content: "Blog de Filosofía y Astrología" });
      this.metaService.updateTag({ name: 'image', content: "https://unsplash.com/es/fotos/signos-del-zodiaco-aDmYkVd6rs4" })
      this.metaService.updateTag({ name:'url',content: 'https://revelacionesdecaro.com/'})
      
    };

 

   
  
}
