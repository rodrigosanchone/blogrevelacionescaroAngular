import { Component, afterNextRender } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Article } from '../../models/article.model';
import { ArticlesService } from '../../services/articles.services';
import { ThemeService } from '../../services/theme.services';
import { Meta, Title } from '@angular/platform-browser';
import { after } from 'node:test';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent  {

  id: string = ""
  change: boolean = true;
  article: Article = {
    titulo: '',
    img: '',
    urlImg: '',
    urlVideo: '',
    contenido: '',
    autor: '',
    fecha: new Date()
  }

  tituloTag: string= ""
  imagenTag:  string= ""



  constructor(private aR: ActivatedRoute,
    private router: Router,
    private aS: ArticlesService,
    private metaService: Meta,
    private title: Title,
    private tS: ThemeService) {
    this.tS.currentChange.subscribe(change => this.change = change);
    afterNextRender(()=>{
      this.id = this.aR.snapshot.params['id'];
      this.aS.getArticleById(this.id).subscribe(
        article => {
          this.article = article
          this.updateMetaTags();
          this.title.setTitle(this.article.titulo)
          this.tituloTag= this.article.titulo
          this.imagenTag= this.article.img
          this.metaService.updateTag({ name: 'title', content: this.article.titulo });
          this.metaService.updateTag({ name: 'description', content: this.article.titulo });
  
      this.metaService.updateTag({ name: 'image', content: 'https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/imagenes%2FIMG_0696.jpeg?alt=media&token=0aeb7f87-0477-4bd2-82f9-fe8804d55216' })
      this.metaService.updateTag({ name: 'url', content: 'https://revelacionesdecaro.com/articulo/smCxQDutVCBxCI4y8T00' }) 
          if (!this.article) {
            this.router.navigate(['/404']);
          } else {
            // Llama aquí al método
          }
  
        }
  
  
      )
    })
  }

 

  updateMetaTags() {

   /*  this.metaService.updateTag({ property: 'og:title', content: 'San Jorge' });
    this.metaService.updateTag({ property: 'og:description', content: 'San Jorge' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/imagenes%2FIMG_0696.jpeg?alt=media&token=0aeb7f87-0477-4bd2-82f9-fe8804d55216' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://revelacionesdecaro.com/articulo/smCxQDutVCBxCI4y8T00'}); */


   
   
  };




}