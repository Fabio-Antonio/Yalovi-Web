import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {observable} from 'rxjs';
import{MessageI}from '../Models/message.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
private contactCollection: AngularFireList<any>;

  constructor(private afs: AngularFireDatabase) {
     

   }

  
   saveMessage(menssagei: MessageI) {
      this.contactCollection=this.GetUsersList();
      this.contactCollection.push({
        email: menssagei.email,
        nombre: menssagei.nombre,
        mensaje: menssagei.mensaje
        
      })
    }

   /* saveventa(venta: ventai) {
      this.contactCollection=this.GetventaList();
      this.contactCollection.push({
        email: venta.email,
        nombre: venta.nombre,
        direccion: venta.direccion,
        celular: venta.celular,
        referencia: venta.referencia,
        pedido: venta.pedido
        
      })
    }*/



      GetUsersList() {
        this.contactCollection = this.afs.list('users-list');
        console.log(this.contactCollection);
        return this.contactCollection;
       
      }  

      GetventaList() {
        this.contactCollection = this.afs.list('venta-list');
        console.log(this.contactCollection);
        return this.contactCollection;
       
      }  
      


  }
