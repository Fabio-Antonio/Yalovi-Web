import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Caracteristica } from 'src/app/Models/caracteristicas';
import { Color } from 'src/app/Models/color.model';
import { Imagen } from 'src/app/Models/imagenes';
import { Marca } from 'src/app/Models/marca.model';
import { Producto } from 'src/app/Models/productos.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],

})
export class ProductoComponent implements OnInit {
  public imagenes: Imagen[] = [];
  public caracteristicas: Caracteristica[] = [];
  public Colores: Color[] = [];
  public uid: string = "";
  public producto: string;
  public pro: Producto;
  public mar: Marca;
  public nombre_producto: string = "";
  public url_imagen: string = "";
  public precio: number = 0;
  public segunda_mano: boolean;
  public token: string = "";
  public cantidad: number = 1;
  public marca: string = "";
  public carritoVal: number = 0;
  public preloader: boolean = true;
  public uid_producto_pedido: string = "";



  public carrito = this.fb.group({
    cantidad: [1, Validators.required],
    talla: ['Ninguna', Validators.required],
    color: ['Indistinto', Validators.required],
    nombre_producto: ['', Validators.required],
    url_imagen: ['', Validators.required],
    precio: [0, Validators.required],
    marca: ['', Validators.required],
    token: ['', Validators.required],
    producto: ['', Validators.required]
   
  });


  constructor(private router: Router, private routeActivated: ActivatedRoute,
    private productoService: ProductosService, private marcaService: MarcaService,
    private fb: FormBuilder, private pedidoService: PedidosService) { }

  ngOnInit(

  ): void {
    this.routeActivated.params.subscribe(({ uid }) => this.getProducto(uid));


  }



  cambiarValor(valor: number) {

    if (this.cantidad == 1 && valor < 1) {
      this.cantidad = 1;
    }
    if (this.cantidad > 1 && valor < 0) {
      this.cantidad = this.cantidad + valor;
    }
    if (this.cantidad >= 0 && valor > 0) {
      this.cantidad = this.cantidad + valor;
    }

    if (this.cantidad >= 100 && valor > 0) {
      this.cantidad = 100;
    }
    this.carrito.patchValue({
      cantidad: this.cantidad
    })

  }


  getProducto(uid: string) {

    this.productoService.getProducto(uid).subscribe(({ imagenes, caracteristicas, pro, colores }) => {
      this.Colores = colores;
      this.imagenes = imagenes;
      this.caracteristicas = caracteristicas;
      this.pro = pro;
      this.nombre_producto = this.pro.nombre_producto;
      this.url_imagen = this.pro.url_imagen;
      this.precio = this.pro.precio;
      this.segunda_mano = this.pro.segunda_mano;
      this.producto = this.pro.uid;
      this.getMarca(pro.marca);

      this.carrito.patchValue({
        precio: this.precio,
        nombre_producto: this.nombre_producto,
        url_imagen: this.url_imagen,
      })
    })


  }


  getMarca(uid: string) {
    this.marcaService.getMarca(uid).subscribe(mar => {
      this.mar = mar;
      this.marca = this.mar.marca;
      this.carrito.patchValue({
        marca: this.marca
      })

    })

    this.preloader = false;
  }

  agregarCarrito() {

    this.token = this.comprobarToken();
    

    this.carrito.patchValue({
      token: this.token,
      producto:this.producto
    })

    if (this.carrito.invalid) {
      return
    }

    this.pedidoService.agregarPedido(this.carrito.value)
      .subscribe(({ mensaje, cantidad }) => {
        localStorage.setItem("productos", cantidad);

        Swal.fire({
          allowOutsideClick: false,
          icon: 'success',
          title: mensaje,
          confirmButtonText: `ok`,
          
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            window.location.reload();
          }
        })

      }, (err) => Swal.fire('Error', err.error.msg, 'error'));

  }



  get generarToken(): string {
    return this.random() + this.random();
  }

  random() {
    return Math.random().toString(36).substr(2);
  };

  comprobarToken() {
    if (!localStorage.getItem("token")) {
      localStorage.setItem("token", this.generarToken);

    } else if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    }
    return localStorage.getItem("token");
  }



}
