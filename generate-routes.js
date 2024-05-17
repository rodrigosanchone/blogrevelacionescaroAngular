const { writeFile } = require('fs');
// Suponiendo que AngularFirestore y map se han importado o definido en otro lugar

class GenerateRoutesService {
  constructor(afs) {
    this.afs = afs;
  }

  generateRoutes() {
    // Obtiene los IDs de los artículos y genera las rutas
    this.afs.collection('articles').snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.doc.id }))
      )
    ).subscribe(articles => {
      const routes = articles.map(article => `/articulo/${article.id}`);
      writeFile('routes.txt', routes.join('\n'), err => {
        if (err) {
          console.error('Error al escribir en el archivo:', err);
        } else {
          console.log('Rutas generadas y guardadas en routes.txt');
        }
      });
    });
  }
}