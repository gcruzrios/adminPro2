import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import  swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  totalRegistros: number = 0;
  desde: number = 0;
  hospitales: Hospital[]=[];
  constructor( 
      public _hospitalService: HospitalService,
      public _modalUploadService : ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
        .subscribe( ()=> this.cargarHospitales() );
  }

  buscarHospital(termino: string){

    if (termino.length <= 0){
        this.cargarHospitales();
        return;
    }
    this._hospitalService.buscarHospital(termino)
        .subscribe ( hospitales => this.hospitales = hospitales );

  }
  cargarHospitales(){
    console.log('desde : ',this.desde);
    this._hospitalService.cargarHospitales(this.desde)
        
        .subscribe((hospitales: any)=> {
          console.log (hospitales);
          this.totalRegistros = hospitales.total;
          this.hospitales = hospitales;
         })
       
       
       // .subscribe( hospitales => this.hospitales = hospitales); 

  }

  guardarHospital(hospital: Hospital){
      this._hospitalService.actualizarHospital( hospital )
          .subscribe(); 
          console.log("Estoy en guardar Hospital");  
      // .subscribe(()=> this.cargarHospitales());
  }

  borrarHospital(hospital: Hospital){
      this._hospitalService.borrarHospital( hospital._id)
          .subscribe( () => this.cargarHospitales());
  }

  crearHospital(){
    
    swal({
      title:'Crear Hospitales',
      text:'Ingrese el nombre del Hospital',
      content: {element: "input" },
      //content:"input",
      //type: "input",
      icon: 'info',
      buttons:{cancel:true,confirm:true},
      
      //DangerMode: true,
    }).then ((valor:string )=>{

      if (!valor || valor.length ===0 ){
        return;
      }
      this._hospitalService.crearHospital(valor)
        .subscribe(()=> this.cargarHospitales());
    });
  }
  

  actualizarImagen(hospital: Hospital){
      this._modalUploadService.mostrarModal('hospitales', hospital._id)
  }


  cambiarDesde(valor: number){

    let desde = this.desde + valor;
    console.log (desde);

    if (desde >= this.totalRegistros){
      return;
    }

    if (desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarHospitales();

  }
}
