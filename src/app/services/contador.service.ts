import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContadorService {

  contadorS =  new EventEmitter<Number>();

  constructor() { }
}
