import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/article/article.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guardians/auth.guard'
import { ControlComponent } from './components/control/control.component';
import { EditComponent } from './components/edit/edit.component';
import { NotpageComponent } from './components/notpage/notpage.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

import { ArticlesService } from './services/articles.services';




const routes: Routes = [
  {path:'',component:ArticlesComponent},
  {path:`index`,component:ArticlesComponent},
  {path:`articulo/:id`, component:ArticleComponent},
  {path:`search/:searchTearm`, component:SearchResultsComponent },
  {path:`sobremi`,component:AboutComponent, data: {
    title: "Información sobre caro"
  }},
  {path:`contacto`,component:ContactComponent},
  {path:'login', component:LoginComponent},
  {path:`control`, component:ControlComponent,canActivate:[AuthGuard] },
  {path:`edit/:id`, component:EditComponent,canActivate:[AuthGuard] },
  {path:'error', component:NotpageComponent},
  {path:'**', component:NotpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router:Router, private articlesService: ArticlesService) {
     this.generateDynamicRoutes(); 
  }

  private generateDynamicRoutes() {
    this.articlesService.getDynamicRoutes().subscribe(dynamicRoutes => {
      dynamicRoutes.forEach(route => {
        const dynamicRoute = {
          path: route.path,
          component: ArticleComponent,
          data: { title: route.title, description: route.title } // Asegúrate de que 'title' y 'description' estén definidos en tus rutas dinámicas
        };
        this.router.config.unshift(dynamicRoute); // Agrega la ruta dinámica al inicio del array de configuración
      });
      this.router.resetConfig(this.router.config); // Actualiza la configuración de rutas
    });
  } 

}
