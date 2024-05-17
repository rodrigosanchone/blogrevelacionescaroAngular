import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import { environments } from '../environments/environments';
import { AdsenseModule } from 'ng2-adsense';
import {NgxPaginationModule} from 'ngx-pagination';
import { AngularFireModule } from '@angular/fire/compat';
 import { AngularFirestoreModule,SETTINGS } from '@angular/fire/compat/firestore';

 import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from 'ng-recaptcha';
 import { ArticlesService } from './services/articles.services';
 import { AuthGuard } from './guardians/auth.guard';
 import { LoginServices } from './services/login.services';

import { TruncatePipe } from './truncate.pipe';
import { SafePipe } from './safe.pipe';
import { FilterPipe } from './filter.pipe';
import { register } from 'swiper/element/bundle';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/article/article.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { ControlComponent } from './components/control/control.component';
import { EditComponent } from './components/edit/edit.component';
import { NotpageComponent } from './components/notpage/notpage.component';
import { FormCreateAtComponent } from './components/form-create-at/form-create-at.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { AdSenseComponent } from './components/ad-sense/ad-sense.component';
import { BannerComponent } from './components/banner/banner.component';

import {ShareButtonsModule} from 'ngx-sharebuttons/buttons';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';

import { SharethisAngularModule } from 'sharethis-angular';




 register()
@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HeaderComponent,
    TruncatePipe,
    SafePipe,
    FilterPipe,
    FooterComponent,
    ArticlesComponent,
    ArticleComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    ControlComponent,
    EditComponent,
    NotpageComponent,
    FormCreateAtComponent,
    SpinnerComponent,
    SearchResultsComponent,
    AdSenseComponent,
    BannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharethisAngularModule,
    AngularFireModule.initializeApp(environments.firestore),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8606289522907503',
      adSlot: 2990369695,
    }),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaV3Module,
    NgxPaginationModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,

  ],
  providers: [
    Title,
    provideClientHydration(),
    ArticlesService,
    AuthGuard,
    LoginServices,
    {provide:SETTINGS,useValue:{}},
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LdmfBspAAAAABcgEZCGa8ekueJF78XQfVAJu-6V',
    },
    provideClientHydration()
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
