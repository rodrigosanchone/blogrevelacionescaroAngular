import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../models/article.model';
import { ArticlesService } from '../../services/articles.services';
import { ThemeService } from '../../services/theme.services';
import { Meta, Title } from '@angular/platform-browser';


import { InlineShareButtonsConfig } from "sharethis-angular";

const inlineShareButtonsConfig: InlineShareButtonsConfig = {
  alignment: "center", // alignment of buttons (left, center, right)
  color: "social", // set the color of buttons (social, white)
  enabled: true, // show/hide buttons (true, false)
  font_size: 16, // font size for the buttons
  labels: "cta", // button labels (cta, counts, null)
  language: "en", // which language to use (see LANGUAGES)
  networks: [
    // which networks to include (see SHARING NETWORKS)
    "whatsapp",
    "linkedin",
    "messenger",
    "facebook",
    "twitter",
  ],
  padding: 12, // padding within buttons (INTEGER)
  radius: 4, // the corner radius on each button (INTEGER)
  show_total: true,
  size: 40, // the size of each button (INTEGER)

  // OPTIONAL PARAMETERS
  url: "https://www.sharethis.com", // (defaults to current url)
  image: "https://bit.ly/2CMhCMC", // (defaults to og:image or twitter:image)
  description: "custom text", // (defaults to og:description or twitter:description)
  title: "custom title", // (defaults to og:title or twitter:title)
  message: "custom email text", // (only for email sharing)
  subject: "custom email subject", // (only for email sharing)
  username: "custom twitter handle", // (only for twitter sharing)
};


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent  implements OnInit {
  config: any;

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
           
          this.config={
            alignment: "center", // alignment of buttons (left, center, right)
            color: "social", // set the color of buttons (social, white)
            enabled: true, // show/hide buttons (true, false)
            font_size: 16, // font size for the buttons
            labels: "cta", // button labels (cta, counts, null)
            language: "en", // which language to use (see LANGUAGES)
            networks: [
              // which networks to include (see SHARING NETWORKS)
              "whatsapp",
              "linkedin",
              "messenger",
              "facebook",
              "twitter",
            ],
            padding: 12, // padding within buttons (INTEGER)
            radius: 4, // the corner radius on each button (INTEGER)
            show_total: true,
            size: 40, // the size of each button (INTEGER)
          
            // OPTIONAL PARAMETERS
            url: `https://revelacionesdecaro.com/articulo/${article.id}`, // (defaults to current url)
            image: this.article.img, // (defaults to og:image or twitter:image)
            description: this.article.titulo, // (defaults to og:description or twitter:description)
            title: this.article.titulo, // (defaults to og:title or twitter:title)
            message: "custom email text", // (only for email sharing)
            subject: "custom email subject", // (only for email sharing)
            username: "custom twitter handle", // (only for twitter sharing)
          };
          
        } else {
          // Redirige a la página 404 si el artículo no existe
          this.router.navigate(['/404']);
        }

        

      });
    });

   
  }
 
}