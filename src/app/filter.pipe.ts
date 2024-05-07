import {Pipe, PipeTransform} from '@angular/core';
import { Article } from '../app/models/article.model';
@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform{
  transform(articles: Article[], searchTerm: string):Article[] {
    console.log('sip')
    if (!articles || !searchTerm) {
      return articles;
      console.log('sip')
    }
    const searchTermLower = searchTerm.toLowerCase();
    return articles.filter((article) =>

      article.titulo.toLowerCase().includes(searchTermLower)

    );


  }
}
