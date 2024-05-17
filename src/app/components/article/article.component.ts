import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../models/article.model';
import { ArticlesService } from '../../services/articles.services';
import { ThemeService } from '../../services/theme.services';
import { Meta, Title } from '@angular/platform-browser';






@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent  implements OnInit {

  config = inlineShareButtonsConfig;

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
  }
 ngOnInit(): void {
    this.aR.params.subscribe(params => {
      const id = params['id'];
      this.aS.getArticleById(id).subscribe(article => {
        this.article = article;
        if (this.article) {
          this.title.setTitle(article.titulo);
          this.metaService.updateTag({ property: 'og:title', content: article.titulo });
          this.metaService.updateTag({ property: 'og:description', content: article.titulo });
          this.metaService.updateTag({ property: 'og:image', content: article.img });
          this.metaService.updateTag({ property: 'og:image:alt', content: article.img });
          this.metaService.updateTag({ name: 'image:alt', content: article.img });
          this.metaService.updateTag({ name: 'title', content: article.titulo });
          this.metaService.updateTag({ name: 'description', content: article.titulo });
          this.metaService.updateTag({ name: 'image', content: article.img });
          this.metaService.updateTag({ name: 'url', content: `https://revelacionesdecaro.com/articulo/${article.id}` });
          
        } else {
          // Redirige a la página 404 si el artículo no existe
          this.router.navigate(['/404']);
        }

      });
    });

   
  }
 
}