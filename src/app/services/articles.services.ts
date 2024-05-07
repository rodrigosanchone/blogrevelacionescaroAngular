import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {  map, finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {  Router } from '@angular/router';
import { Article } from '../models/article.model';
import { Image } from '../models/image.model';

@Injectable()
export class ArticlesService {
  articlesCollection!: AngularFirestoreCollection<Article>;
  articlesCollection2!: AngularFirestoreCollection<Article>;

  articleDoc!: AngularFirestoreDocument<Article>;
  articles$!: Observable<Article[]>;
  article$!: Observable<Article | any>;
  articleImg!: AngularFireStorage;
 /*  newImageURL!:AngularFireStorage */
  filePath:any;
  downloadURL!: Observable<string>;


  constructor(private db: AngularFirestore,
              private storage: AngularFireStorage,
              private router: Router
    ) {
    this.articlesCollection = db.collection('articles', (ref) =>
      ref.orderBy('fecha', 'desc')
    );
    this.articlesCollection2 = db.collection('articles', (ref) =>
      ref.orderBy('fecha', 'asc').limitToLast(4)
    );
    const ref = this.storage.ref('path/to/file.pdf');
  }
  getArticles(): Observable<Article[]> {
    this.articles$ = this.articlesCollection.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const data = accion.payload.doc.data() as Article;
          data.id = accion.payload.doc.id;
          return data;
        });
      })
    );
    return this.articles$;
  }

  getArticlesLast(): Observable<Article[]> {
    this.articles$ = this.articlesCollection2.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const data = accion.payload.doc.data() as Article;
          data.id = accion.payload.doc.id;
          return data;
        });
      })
    );
    return this.articles$;
  }



  getArticleById(id: string) {
    this.articleDoc = this.db.doc<Article>(`articles/${id}`);
    this.article$ = this.articleDoc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null;
          console.log('no existe')
        } else {
          const data = accion.payload.data() as Article;
          data.id = accion.payload.id;
          return data;
        }
      })
    );
    return this.article$ ;
  }

  addArticle(article:Article){
    article.titulo = article.titulo.toUpperCase();
   this.articlesCollection.add(article)
  }




  editArticle(article:Article, newImage?: Image) {
    // Obtener la URL de la imagen anterior
    const oldImageURL = article.img;
    article.titulo = article.titulo.toUpperCase();
    // Actualizar el artículo con la nueva información
    this.articleDoc = this.db.doc(`articles/${article.id}`);
    this.articleDoc.update(article);

    // Si se proporciona una nueva imagen, subirla y actualizar la URL de la imagen en el artículo
    if (newImage) {
      this.uploadImage(article.id="", newImage).then((newImageURL) => {
        article.img = newImageURL;
        this.articleDoc.update(article);

        // Eliminar la imagen anterior del almacenamiento de Firebase
        if (oldImageURL) {
          const oldImageRef = this.storage.refFromURL(oldImageURL);
          oldImageRef.delete().toPromise().then(() => {
           
          }).catch((error) => {
            console.error('Error al eliminar la imagen anterior:', error);
          });
        }
      }).catch((error) => {
        console.error('Error al subir la nueva imagen:', error);
      });
    }
  }

  uploadImage(articleId:string , image:Image): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.filePath = `imagenes/${image.name}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            urlImage => {
              this.downloadURL = urlImage;
              resolve(urlImage); // Resuelve la promesa con la URL de la imagen
            },
            error => {
              reject(error); // Rechaza la promesa con el error
            }
          );
        })
      ).subscribe(()=>{
        this.db.doc(`articles/${articleId}`).update({ img: this.downloadURL });
    });
  });
  }


  deleteArticle(article:Article){
    const imageURL = article.img
    this.articleDoc= this.db.doc(`articles/${article.id}`)
    this.articleDoc.delete()
    this.articleDoc = this.db.doc(`articles/${article.id}`);
    this.articleDoc.delete();

    // Si hay una imagen asociada con el artículo, eliminarla del almacenamiento de Firebase
    if (imageURL) {
      const imageRef = this.storage.refFromURL(imageURL);
      imageRef.delete().toPromise().then(() => {
        console.log('Imagen eliminada con éxito');
      }).catch((error) => {
        console.error('Error al eliminar la imagen:', error);
      });
    }

 }



buscarArticulosPorTitulo(titulo: string): Observable<Article[]> {
 /*  this.articlesCollection2 = this.db.collection('articles', (ref) =>
  ref.where('titulo', '>=', titulo).where('titulo', '<=', titulo + '\uf8ff')) */
/*  this.articlesCollection2 = this.db.collection('articles', (ref) =>
    ref.where('titulo', '==', titulo));*/
  this.articlesCollection2 = this.db.collection('articles', (ref) =>
    ref.orderBy('titulo').startAt(titulo).endAt(titulo + '\uf8ff')
  );

  /*   this.articlesCollection2 = this.db.collection('articles', (ref) =>
  ref.where('titulo', 'array-contains', titulo) ) */



  this.articles$ = this.articlesCollection2.snapshotChanges().pipe(
    map((cambios) => {
      return cambios.map((accion) => {
        const data = accion.payload.doc.data() as Article;
        data.id = accion.payload.doc.id;
        return data;
      });
    })
  );
  return this.articles$;
}

}

