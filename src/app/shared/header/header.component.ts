import { Component, OnInit,Input,EventEmitter,Output, Renderer2, ElementRef} from '@angular/core';
import {CategoriasService} from 'src/app/services/categorias.service'
import { Categoria } from 'src/app/Models/categoria.interfaces';
import { subCategoria } from 'src/app/Models/subCategoria.model';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Producto } from 'src/app/Models/productos.model';
import { ContadorService } from 'src/app/services/contador.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',  
  styleUrls: ['./header.component.css'],
 
})
export class HeaderComponent implements OnInit {
 categorias : Categoria []=[];
 subcategorias : subCategoria[]=[];
 productos:Producto[]=[];
  parent = document.getElementById('show');
   
 valor: number=0;
 


 createFormGroup(){
  return new FormGroup({
    search : new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ.,/ ]+$')]),
    
  })

}
buscar: FormGroup;


  constructor(private categoriasService : CategoriasService, private route: Router,
     private productoServie: ProductosService,private render: Renderer2, private el: ElementRef, private contadorService: ContadorService) { }

  ngOnInit(): void {
    this.buscar = this.createFormGroup();
    this.ValorCarrito()
    this.cargarCategorias();
    this.render.setStyle(document.getElementById('show'), 'display', 'none');
    this.render.setStyle(document.getElementById('sub_cat'), 'display', 'none');
  }


  cargarCategorias(){
   
    this.categoriasService.getCategorias()
    .subscribe(({categorias}) =>{
      this.categorias = categorias;
    })
    this.contadorService.contadorS.emit(Number(localStorage.getItem("productos"))||0);
  }

  getSubCategoria(uid:string){
    this.categoriasService.getSubCategorias(uid)
    .subscribe(({subcategorias}) =>{
      this.subcategorias = subcategorias;
    })

    if(!this.subcategorias==null){
      this.render.setStyle(document.getElementById('sub_cat'), 'display', 'none');
    }else{
      this.render.setStyle(document.getElementById('sub_cat'), 'display', 'block');
    }
  }


  busqueda(){
    if(this.buscar.invalid){
      return;
    }
  this.productoServie.buscar(this.buscar.value);
  }

 buscar_rapido(event){  

    if(event.which===32&&this.buscar.controls.search.value!=""){
      if(this.buscar.invalid){
        return;
      }else{
        this.productoServie.getProductosReg(this.buscar.controls.search.value)
      .subscribe(({productos})=>{
        this.productos=productos;
      });   
      this.render.setStyle(document.getElementById('show'), 'display', 'block');
      }
      
    }else if(event.which==8){
      this.productos=[];
      this.render.setStyle(document.getElementById('show'), 'display', 'none');
    }else{
      this.productos=[];
      this.render.setStyle(document.getElementById('show'), 'display', 'none');
    }

 }
  
   cambia(valor:string){
     this.buscar.patchValue({
       search:valor
     })
     this.productos=[];
     this.render.setStyle(document.getElementById('show'), 'display', 'none');
    
   }

   ValorCarrito(){
     this.contadorService.contadorS.subscribe(valor=>{
       this.valor=valor;
     })
   }

}
