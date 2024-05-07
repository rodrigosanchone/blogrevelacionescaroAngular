import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Article} from '../../models/article.model'
import { ArticlesService } from '../../services/articles.services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Image } from '../../models/image.model';
import { ThemeService } from '../../services/theme.services';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { SearchResultsService } from '../../services/searchResult.services';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  activo!:boolean;
  id:string=""
  image!: Image
  imagenCargada=""
  article:Article={
    id:'',
    titulo:'',
    img:'',
    urlImg:'',
    urlVideo:'',
    contenido:'',
    autor:'',
    fecha: new Date()
  }
  form: FormGroup
  change!:boolean;

  titulo: FormControl= new FormControl("",[Validators.required])
  urlImg: FormControl= new FormControl("",[]);
  urlVideo: FormControl= new FormControl("",[]);
  contenido: FormControl= new FormControl("",[Validators.required]);
  fecha:  FormControl= new FormControl("",[Validators.required]);
  autor:  FormControl= new FormControl( "Carolina");

  FormControl = new FormControl()

  constructor(
    private tS: ThemeService,
    private formBuilde:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private aS:ArticlesService,
    private imagen: AngularFireStorage,
    private searchResultsService: SearchResultsService,
  ){

    this.tS.currentChange.subscribe(change => this.change = change);
    this.form= this.formBuilde.group({
      titulo: this.titulo,
      urlImg: this.urlImg,
      urlVideo:this.urlVideo,
      contenido:this.contenido,
      fecha:this.fecha,
      autor:this.autor

    })

  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id']
    this.aS.getArticleById(this.id).subscribe(
      article=>{
        this.article=article
      }
    )
  }

  cargarIMG(event:any):void{

     const reader = new FileReader();
    reader.onload = () => {
      this.imagenCargada = reader.result as string;
    }
    reader.readAsDataURL(event.target.files[0]);

    this.image=  event.target.files[0]


  }

  onSubmit(value:any){
    /* const nombre= this.form.get('nombre') as FormControl */
    value.id=this.id
    if(this.image){
      this.aS.editArticle(this.article,this.image);
    }else{
      this.aS.editArticle(this.article)
    }


    Swal.fire({
      title: 'Exito!',
      text: 'Bien!,Cambiastes los datos del articulo',
      icon: 'success',
      confirmButtonText: 'Listo'
    })

    this.router.navigate(['/control']);
  }

}

