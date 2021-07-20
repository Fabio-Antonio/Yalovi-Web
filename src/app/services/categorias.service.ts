import { Injectable, NgZone } from '@angular/core';
import { Categoria } from '../Models/categoria.interfaces';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {catchError, map, tap} from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { subCategoria } from '../Models/subCategoria.model';
import { cargarCategorias } from '../interfaces/cargarCategorias';
import { cargasSubcategoria } from '../interfaces/cargasSubcategorias';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
public categoria: Categoria;

  constructor(private http:HttpClient, private route:Router, private ngZone: NgZone ) { }

  getCategorias(){

    return this.http.get<cargarCategorias>(`${base_url}/categorias`).pipe(
      map( resp =>{
        const categorias = resp.categorias.map(
          cat => new Categoria(cat.descripcion,cat.categoria,cat.uid) 
        );
        return {
          categorias 
        }
      })
    )
    
    
  }
  getSubCategorias(uid:string){
     
    return this.http.get<cargasSubcategoria>(`${base_url}/clasificacion/${uid}`).pipe(
      map( resp =>{
        
        const subcategorias = resp.clasificacion.map(
          subcat => new subCategoria(subcat.uid,subcat.categoria,subcat.sub_categoria) 
        );
        return {
          subcategorias 
        }
      })
    )
    
    
  }
}
