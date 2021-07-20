import { Injectable,NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {catchError, map, skip, skipWhile, tap} from 'rxjs/operators';
import { Marca } from '../Models/marca.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  public marca:Marca;

  constructor(private route:Router,private http:HttpClient, private ngZone: NgZone) { }


getMarca(uid:string){

  return this.http.get(`${base_url}/marca/${uid}`).pipe(
    map( (resp:any) =>{
     
      const { marca,uid_marca} = resp.marca;
      this.marca = new Marca(uid_marca,marca);
      const mar = this.marca;
      
      return mar;
    })
  )


}


}
