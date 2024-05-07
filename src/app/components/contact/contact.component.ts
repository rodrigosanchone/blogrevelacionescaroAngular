import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import{ ThemeService } from '../../services/theme.services';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import {UntypedFormBuilder, UntypedFormControl, Validators,FormGroup,  FormControl,} from '@angular/forms'
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  title = 'Contacto';
  change!:boolean;
  reCAPTCHAToken: string = "6LdmfBspAAAAAKx7psIlIU_Lo8U9TJtunfaZNmWQ";
  tokenVisible: boolean = false;
  form= new FormGroup({
    /* nombre: new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    telefono: new FormControl ('',Validators.required),
    mensaje: new FormControl ('',Validators.required) */
  })

  submitted = false; // Agrega la propiedad submitted
  nombre: UntypedFormControl = new UntypedFormControl("", [Validators.required]);
  email: UntypedFormControl = new UntypedFormControl("", [Validators.required, Validators.email]);
  mensaje: UntypedFormControl = new UntypedFormControl("", [Validators.required, Validators.maxLength(256)]);
  telefono: UntypedFormControl = new UntypedFormControl("", [Validators.required]);

  responseMessage!: string; // the response message to show to the user
  responseMessage2!: string; // the response message to show to the user
  responseMessage3!: string; // the response message to show to the user
  responseMessage4!: string; // the response message to show to the user



  constructor(private formBuilder: UntypedFormBuilder,
    private titleService:Title,
    private tS: ThemeService,
    private recaptchaV3Service: ReCaptchaV3Service
    ) {
   
    

      this.tS.currentChange.subscribe(change => this.change = change);

    this.form = this.formBuilder.group({
      nombre: this.nombre,
      email: this.email,
      mensaje: this.mensaje,
      telefono: this.telefono,
    });
  }

  onSubmit(e:Event){
    
        this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
          this.tokenVisible = true;
          this.reCAPTCHAToken = `Token [${token}] generated`;
      }); 
    
        this.submitted= true;
         e.preventDefault()
         if(this.nombre.value.length < 3){
           this.responseMessage= "El nombre debe tener más de 3 letras";
           setInterval(()=>{
             this.responseMessage = "";
           }, 8000);
         }
         if(this.email.value.length<1){
          this.responseMessage2= "Debe ingresar un correo valido";
          setInterval(()=>{
            this.responseMessage2 = "";
          }, 15000);
        }
        if(this.telefono.value<1){
          this.responseMessage3= "Debe ingresar un teléfono";
          setInterval(()=>{
            this.responseMessage3 = "";
          }, 15000);
        }
        if(this.mensaje.value.length<1){
          this.responseMessage4= "No dejes tu mensaje vacio ";
          setInterval(()=>{
            this.responseMessage4 = "";
          }, 15000);
        }
        if(this.nombre.value.length < 3 || this.email.value.length<1 || this.telefono.value<1 || this.mensaje.value.length<1){
          Swal.fire({
            title: 'Error!',
            text: 'Faltan datos que rellenar',
            icon: 'error',
            confirmButtonText: 'Volver'
          })
         }else{
          emailjs.sendForm('service_wunaeqg', 'template_zyltwq7', e.target as HTMLFormElement, 'Ywnhuln6wTbEmCFmE')
          .then((result: EmailJSResponseStatus) => {
    
          }),
          Swal.fire({
            title: 'Enviado!',
            text: 'Gracias por contactarme, pronto te contactara',
            icon: 'success',
            confirmButtonText: 'Cool'
          }),
          this.form.reset()
        }
     }

  ngOnInit(){
   
    this.titleService.setTitle(this.title);
   
  }


  
  
  



}
