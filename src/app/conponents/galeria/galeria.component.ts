import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/Models/productos.model';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  public uid:string = "";
  public productos :Producto []=[];
  preloader: boolean= true;
  constructor(private route:Router,private  activateRoute: ActivatedRoute, private productoService :ProductosService) { }

  ngOnInit(): void {
    console.log('parametros', this.activateRoute.params);
   this.activateRoute.params.subscribe(({uid})=>this.getProductos(uid));
   
  }

//carrito(theme: string,monto:string){
  //  localStorage.setItem(theme,monto);
  //}
  
   
 getProductos(uid: string){
  this.productoService.getProductosReg(uid)
  .subscribe(({productos})=>{
    this.productos=productos;
    this.preloader = false;
  }); 

  if(!this.productos){
    this.productoService.getProductosSub(uid).subscribe(({productos})=>{
      this.productos = productos;
      this.preloader = false;
    })
  }
   
   

 
  
 }

 irProducto(uid_producto : String){
    this.route.navigateByUrl(`Producto/${uid_producto}`);
 }

}
