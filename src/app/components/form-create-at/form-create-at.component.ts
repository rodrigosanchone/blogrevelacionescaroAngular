import { Component} from '@angular/core';
import { ThemeService } from '../../services/theme.services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Article } from '../../models/article.model';
import Swal from 'sweetalert2'
import { ArticlesService } from '../../services/articles.services';
import { Image } from '../../models/image.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-form-create-at',
  templateUrl: './form-create-at.component.html',
  styleUrls: ['./form-create-at.component.css']
})
export class FormCreateAtComponent {
  image!: Image
  imagenCargada=""
  today = new Date();
  formattedDate = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
  form: FormGroup
  article!: Article

  titulo: FormControl= new FormControl("",[Validators.required])
  urlImg: FormControl= new FormControl("",[]);
  urlVideo: FormControl= new FormControl("",[]);
  contenido: FormControl= new FormControl("",[Validators.required]);
  fecha:  FormControl= new FormControl("",[Validators.required]);
  autor:  FormControl= new FormControl( "Carolina");
  img: FormControl= new FormControl("");

  FormControl = new FormControl();

  change=true;
  constructor(private tS: ThemeService,
    private formBuilde:FormBuilder,
    private aS:ArticlesService,
    private imagen: AngularFireStorage,

    ){
    this.tS.currentChange.subscribe(change => this.change = change);

    this.form=this.formBuilde.group({
       titulo: this.titulo,
       urlImg: this.urlImg,
       urlVideo:this.urlVideo,
       contenido:this.contenido,
       fecha:this.fecha,
       autor:this.autor
    })
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



     if(!this.titulo.value){
      Swal.fire({
        title: 'Error!',
        text: 'Ingresa un titulo',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })
      return;
     }

     if(!this.contenido.value){
      const palabras = this.contenido.value.split('')
       if(palabras.length<30){
        Swal.fire({
          title: 'Error!',
          text: 'Trata que el  la entrada sea más largo',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        })
        return;
       }

     }

     if (this.form.status === "VALID") {
      const article: Article = value;


      // Si se proporciona una nueva imagen, subirla y actualizar la URL de la imagen en el artículo
      if (this.image) {
        this.aS.uploadImage('', this.image).then((newImageURL) => {
          article.img = newImageURL;
          this.aS.addArticle(article);

          Swal.fire({
            title: 'Exito!',
            text: 'Bien! Creo una nueva entrada',
            icon: 'success',
            confirmButtonText: 'Listo'
          });


        }).catch((error) => {
          console.error('Error al subir la nueva imagen:', error);
        });
      } else {
        this.aS.addArticle(article);

        Swal.fire({
          title: 'Exit!',
          text: 'Bien! Creo una nueva entrada',
          icon: 'success',
          confirmButtonText: 'Listo'
        });


      }

      this.form.reset()
    }

  }

}
