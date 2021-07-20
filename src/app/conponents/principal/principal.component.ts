
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/Models/productos.model';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: [
  ]
})
export class PrincipalComponent implements OnInit {
productos1 : Producto []= [];
productos2 : Producto []= [];
preloader: boolean= true;


  constructor(private productoService : ProductosService, private router: Router ) { }

  ngOnInit(): void {
    this.getProductos();
    this.getProductos2();
  }


  getProductos (){
    this.productoService.getProductos()
    .subscribe(({productos1})=>{
      this.productos1 = productos1;
      
    })
  }

  getProductos2 (){
    this.productoService.getProductos2()
    .subscribe(({productos2})=>{
      this.productos2 = productos2;
      this.preloader= false;
    })
  }

  irProducto(uid:string){
    this.router.navigateByUrl(`Producto/${uid}`);
  }


}
