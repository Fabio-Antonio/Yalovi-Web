import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { throwError } from 'rxjs';
import {RegistroService} from 'src/app/services/registro.service';
import Swal  from 'sweetalert2';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: [
  ]
})
export class FormularioComponent implements OnInit {
  createFormGroup(){
      return new FormGroup({
        email : new FormControl(''),
        nombre : new FormControl(''),
        mensaje : new FormControl(''),
      })

    }
    register: FormGroup;
  constructor(private db:RegistroService) 
  {(
    this.register = this.createFormGroup());
   }

  ngOnInit(): void {
    
  }

onRegister(){
  
  this.db.saveMessage(this.register.value);
  Swal.fire({
    icon: 'success',
    title: 'Listo!',
    text: 'Pronto recibiras una respuesta',
  })
}



}
