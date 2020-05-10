import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  totalRegistros: number = 0;
  medicos: Medico[] = [];
  desde: number = 0;
  constructor(
      public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos(){
    console.log('desde : ',this.desde);
     this._medicoService.cargarMedicos(this.desde)
        .subscribe((medicos: any)=> {
          console.log (medicos);
          this.totalRegistros = medicos.total;
          this.medicos = medicos;
        })

     //   .subscribe (medicos => this.medicos = medicos );
  }

  buscarMedico (termino: string ){

    if (termino.length <= 0){
      this.cargarMedicos();
      return;
    }
   
    this._medicoService.buscarMedicos(termino)
      .subscribe(( medicos: Medico[])=>{
        this.medicos = medicos;
    });
  }


  borrarMedico (medico: Medico ){
    
    
    
    this._medicoService.borrarMedico(medico._id)
            .subscribe( () => this.cargarMedicos());                
                
      
    
    // swal({
    //   title: 'Está seguro?',
    //   text: 'Va a borrar a : ' + medico.nombre,
    //   icon: 'warning',

    //   buttons:{cancel:true,confirm:true},
    //   //buttons: true,
    //   dangerMode: true,
    // })
    

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
    this.cargarMedicos();

  }


}
