import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Verification } from '../Models/varification';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private http :HttpClient) { }

  sendVerificationEmail(emailData : Verification ){
    return this.http.put(`${base_url}/verificacion`,emailData).pipe(
      map((resp:any)=>{
        const mensaje = JSON.stringify(resp.msg);
        return {
          mensaje,
        }
      })
    )
  
  }

  sendNumberVerification(token : string, numero: number){
    return this.http.patch(`${base_url}/verificacion/${token}/${numero}`,null).pipe(
      map((resp:any)=>{
        const mensaje = resp.msg;
        
        return {
          mensaje,
        }
      })
    )
  
  }
}
