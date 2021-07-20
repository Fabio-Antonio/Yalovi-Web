import { Injectable,NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {catchError, map, skip, skipWhile, tap} from 'rxjs/operators';
import { pedidoForm } from '../interfaces/registroPedido.interface';
import { cargaPedidos } from '../interfaces/cargarPedidos.interface';
import { Pedido } from '../Models/pedidos.model';
import { Venta } from '../Models/venta.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PedidosService {


  constructor(private route:Router,private http:HttpClient, private ngZone: NgZone  ) { }

agregarPedido(pedidoForm : pedidoForm ){
 
  return this.http.post(`${base_url}/pedidos`,pedidoForm).pipe(
    map((resp:any)=>{
      const mensaje = resp.msg.toString();
      const cantidad = resp.cantidad;
      
      return {
        mensaje,
        cantidad
      }
    })
  )

}

agregarVenta(ventaForm : Venta ){
 
  ventaForm.numero_tarjeta.replace("[0-9]","*");
  ventaForm.cvv.replace("[0-9]","*");
  
  return this.http.post(`${base_url}/ventas`,ventaForm).pipe(
    map((resp:any)=>{ 
      const mensaje = resp.msg.toString();
      const pago = JSON.stringify(resp.pago.payment_status);
      const correo = resp.correo.toString();        
      return {
        mensaje,
        pago,
        correo
      }
    })
  )

}

borrarPedido(uid:string ){
 
  return this.http.delete(`${base_url}/pedidos/${uid}`).pipe(
    map((resp:any)=>{
      const mensaje = resp.msg.toString();
      
      
      return {
        mensaje
      }
    })
  )

}

getPedidos(token:string){

  return this.http.get<cargaPedidos>(`${base_url}/pedidos/${token}`).pipe(
   
    map( resp => {
      
      const pedidos = resp.pedidos.filter(resp => resp != null)
      .map(
        p1 => new Pedido(p1.uid,p1.producto,p1.token,p1.nombre_producto,p1.precio,p1.cantidad,p1.marca,p1.url_imagen,p1.color,p1.talla)
        
        )
        const cantidad = resp.cantidad;
        const total = resp.total
      ;
      return {
      pedidos,
      cantidad,
      total

      }
    })
  )



}

validarToken(){
  if(localStorage.getItem("token")==""){
    return false;
  }else if (localStorage.getItem("productos")==""){
    return false;
  }else{
    return true;
  }


}







}
