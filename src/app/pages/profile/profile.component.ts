import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import  swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;

  imagenTemp:string | ArrayBuffer;

  constructor( public _usuarioService: UsuarioService) { 

    this.usuario = this._usuarioService.usuario;

  }

  ngOnInit() {
  }

  guardar(usuario: Usuario){

     //console.log(usuario);
     this.usuario.nombre = usuario.nombre;
     if (!this.usuario.google){
        this.usuario.email=usuario.email
     }
     //this.usuario.email= usuario.email;
     //console.log('estoy en guardar');
     //console.log(this.usuario);
     this._usuarioService.actualizarUsuario( this.usuario )
           .subscribe( );
        
  }


  seleccionImagen( archivo: File ){

    if (!archivo){
      this.imagenSubir = null;
      return;
    }
    
    if (archivo.type.indexOf('image') <0){
      swal('Sólo imágenes','El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    };


    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL(archivo);
    
    var csv: string = reader.result as string;
    //var csv: string | ArrayBuffer = reader.result;
    reader.onloadend = () => this.imagenTemp  = reader.result;

    //reader.onload = () =>{
      //console.log(csv);
      //console.log(reader.result);
      //this.imagenTemp= reader.result as string;
    //}
    //this.imagenSubir = archivo;
        

  }

  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
