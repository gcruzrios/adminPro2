import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})

export class PromesasComponent implements OnInit {

  constructor() {
    let promesa = new Promise( (resolve, reject) => {
      let contador =0;
      
      let intervalo = setInterval( () => {

        contador += 1;

        if (contador === 3){
          resolve('OK');
         // reject('simplemente un error');
          clearInterval(intervalo);

        }


      }, 1000 );
    }
);

    promesa.then(
      mensaje =>  console.log('termino!', mensaje)
    )
    .catch (error => console.error ('error en la promesa', error));
}



    
  ngOnInit() {
  }

}
