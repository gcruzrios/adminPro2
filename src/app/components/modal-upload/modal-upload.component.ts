import { Component, OnInit } from '@angular/core';
import  swal from 'sweetalert';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';
@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  //  oculto: string = '';

  
  imagenSubir: File;

  imagenTemp:string | ArrayBuffer;

  constructor (public _subirArchivoService : SubirArchivoService,
               public _modalUploadService: ModalUploadService) 
  {

    
   }

  ngOnInit() {
  }

 
  cerrarModal(){
    this.imagenTemp=null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
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

           

  }

  subirImagen(){
    console.log('Tipo:',this._modalUploadService.tipo )

    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then (resp => {
        console.log( resp );
        this._modalUploadService.notificacion.emit( resp );
        this.cerrarModal();
      })
      .catch(err=>{
        console.log('Error en la carga...');
      });
  }

}
