import { Component } from '@angular/core';
import { Article } from '../../models/article.model';
import { ArticlesService } from '../../services/articles.services';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  articles1!: Article[]
  constructor(private aS: ArticlesService,){

  }

  ngOnInit():void{
    this.aS.getArticlesLast().subscribe(
      articles=>{
          this.articles1= articles;
         
      }
    
     )
  } 
}
