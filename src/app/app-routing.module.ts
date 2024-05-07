import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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




const routes: Routes = [
  {path:'',component:ArticlesComponent},
  {path:`index`,component:ArticlesComponent},
  {path:`articulo/:id`, component:ArticleComponent,
    data: {
    title: "articulo/:titulo",
  }
   },
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
export class AppRoutingModule { }
