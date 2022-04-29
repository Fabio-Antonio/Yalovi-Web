
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Injectable, NgZone } from '@angular/core';
import {catchError, map, skip, skipWhile, tap} from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { cargarProductos } from '../interfaces/cargarProductos';
import { Producto } from '../Models/productos.model';
import { buscarForm } from '../interfaces/buscarForm.interface';
import { cargarCaima } from '../interfaces/cargarCaima';
import { Imagen } from '../Models/imagenes';
import { Caracteristica } from '../Models/caracteristicas';
import { Color } from '../Models/color.model';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
public productos :Producto []= [];
public producto : Producto;
  constructor(private http:HttpClient, private route:Router, private ngZone: NgZone) { }


getProductos(){

  return this.http.get<cargarProductos>(`${base_url}/carrusel_principal`).pipe(
    map( resp =>{
      const productos1 = resp.productos1.filter(resp => resp != null).map(
        p1 => new Producto(p1.uid,p1.sub_categoria,p1.nombre_producto,p1.precio,p1.marca,p1.url_imagen,p1.segunda_mano,p1.descuento), 
      )
      
      /*const productos2 = resp.productos2.map(
        p1 => new Producto(p1.uid_producto,p1.uid_sub_categoria,p1.nombre_producto,p1.precio,p1.uid_marca,p1.url_imagen,p1.segunda_mano,p1.descuento), 
      )
      */
      ;
      return {
        productos1
      }
    })
  )

}

getProductos2(){

  return this.http.get<cargarProductos>(`${base_url}/carrusel_principal`).pipe(
   
    map( resp => {
      
      const productos2 = resp.productos2.filter(resp => resp != null)
      .map(
        p1 => new Producto(p1.uid,p1.sub_categoria,p1.nombre_producto,p1.precio,p1.marca,p1.url_imagen,p1.segunda_mano,p1.descuento)
      )
      ;
      return {
        productos2
      }
    })
  )



}




getProductosMarca(marca:string){

  return this.http.get<cargarProductos>(`${base_url}/carrusel_principal/${marca}`).pipe(
   
    map( resp => {
      
      const productos1 = resp.productos1.filter(resp => resp != null)
      .map(
        p1 => new Producto(p1.uid,p1.sub_categoria,p1.nombre_producto,p1.precio,p1.marca,p1.url_imagen,p1.segunda_mano,p1.descuento)
      )

      const productos2 = resp.productos2.filter(resp => resp != null)
      .map(
        p2 => new Producto(p2.uid,p2.sub_categoria,p2.nombre_producto,p2.precio,p2.marca,p2.url_imagen,p2.segunda_mano,p2.descuento)
      )
      
      ;
      return {
        productos1,
        productos2
      }
    })
  )



}


getMasBuscados(){

  return this.http.get<cargarProductos>(`${base_url}/pedidos`).pipe(
    map( resp => {
      const productos1 = resp.productos1.filter(resp => resp != null)
      .map(
        p1 => new Producto(p1.uid,p1.sub_categoria,p1.nombre_producto,p1.precio,p1.marca,p1.url_imagen,p1.segunda_mano,p1.descuento)
      )

      const productos2 = resp.productos2.filter(resp => resp != null)
      .map(
        p2 => new Producto(p2.uid,p2.sub_categoria,p2.nombre_producto,p2.precio,p2.marca,p2.url_imagen,p2.segunda_mano,p2.descuento)
      )
      
      ;
      return {
        productos1,
        productos2
      }
    })
  )



}





getProductosSub(uid:string){
   
  return this.http.get<cargarProductos>(`${base_url}/buscar/${uid}`).pipe(
    map( resp =>{
      
      const productos = resp.productos1.filter(resp => resp != null).map(
        p1 => new Producto(p1.uid,p1.sub_categoria,p1.nombre_producto,p1.precio,p1.marca,p1.url_imagen,p1.segunda_mano,p1.descuento), 
      )
      ;
      return {
        productos
      }
    })
  )

}

getProductosReg(uid:string){
   
  return this.http.get<cargarProductos>(`${base_url}/buscarreg/${uid}`).pipe(
    map( resp =>{
      
      const productos = resp.productos1.filter(resp => resp != null).map(
        p1 => new Producto(p1.uid,p1.sub_categoria,p1.nombre_producto,p1.precio,p1.marca,p1.url_imagen,p1.segunda_mano,p1.descuento), 
      )
      ;
      return {
        productos
      }
    })
  )

}



getProducto(uid:string){

  return this.http.get<cargarCaima>(`${base_url}/productos/${uid}`).pipe(
    map( resp =>{
      const imagenes = resp.imagenes.filter(resp => resp != null).map(
        p1 => new Imagen(p1.uid_imagen,p1.uid_producto,p1.url_imagen), 
      )
      
      const caracteristicas = resp.caracteristicas.filter(resp => resp != null).map(
        p2 => new Caracteristica(p2.uid_caracteristica,p2.uid_producto,p2.caracteristica), 
      )
      let  i= 0;
      const colores = resp.colores.filter(resp => resp != null).map(
       pp3=> new Color(pp3[0].name,pp3[0].code)
       ,                     
      )
      console.info(colores);
      const { url_imagen,nombre_producto,precio,descuento,uid,sub_categoria,marca,segunda_mano} = resp.producto;
      this.producto = new Producto(uid,sub_categoria,nombre_producto,precio,marca,url_imagen,segunda_mano,descuento);
      const pro = this.producto;
      ;
      return {
        imagenes,
        caracteristicas,
        pro,
        colores
      }
    })
  )

}


buscar(formData : buscarForm){
  this.route.navigateByUrl(`galeria/${formData.search}`);

}


}
