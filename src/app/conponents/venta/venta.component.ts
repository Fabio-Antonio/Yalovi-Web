import {  Router } from '@angular/router';
import { Component, NgZone, OnInit,Input } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Pedido } from 'src/app/Models/pedidos.model';
import { PedidosService } from 'src/app/services/pedidos.service';
import {RegistroService} from 'src/app/services/registro.service';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { ContadorService } from 'src/app/services/contador.service';
import { VerificationService } from 'src/app/services/verification.service';
import { Verification } from 'src/app/Models/varification';

declare function tokenizador();
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})



export class VentaComponent  implements OnInit{
cadena: string=""; 
pedidos: Pedido []=[];
cantidad_carrito : number=0;
total: number =0;
preloader :boolean=true;
preloader2 :boolean=false;
fecha = new Date();
public formSubmitted=false;

envios:boolean=true;
verificacion: Verification = null;

  compra=this.fb.group({
  nombre:['',[Validators.required,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
  apellidos:['',[Validators.required,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
  email:['',[Validators.required,Validators.email]],
  direccion:['',[Validators.required,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,. ]+$')]],
  referencias:['',[Validators.required,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,. ]+$')]],
  telefono:['',[Validators.required,Validators.pattern('^[+0-9]+$')]],
  pais:['Ninguno',[Validators.required,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
  estado:['Ninguno',[Validators.required,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
  postal:['',[Validators.required,Validators.pattern('^[0-9]+$'),Validators.maxLength(5)]],
  forma_pago:['',Validators.required],
  nombre_tarjeta:['',[Validators.required,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
  numero_tarjeta:['',[Validators.required,Validators.pattern('^[0-9]+$'),Validators.maxLength(16)]],
  mm:['',[Validators.required,Validators.pattern('^[0-9]+$'),Validators.maxLength(2)]],
  aa:['',[Validators.required,Validators.pattern('^[0-9]+$'),Validators.maxLength(2)]],
  cvv:['',[Validators.required,Validators.pattern('^[0-9]+$'),Validators.maxLength(3)]],
  token:['',[Validators.required]],
  fecha:[0,Validators.required],
  total:[0,Validators.required],
  status:['compra',Validators.required],
  terminos:[false,Validators.required],
  token_card:['',[Validators.required,Validators.pattern('^[A-Za-z0-9\d_]+$')]]

})
 
@Input() tokenizar: string ="aqui va el token";

constructor(private router:Router, private fb:FormBuilder, private pedidosServices : PedidosService, private ngZone : NgZone, 
  private contadorService: ContadorService,
  private verificationService : VerificationService  ) 
{
  
  
 }
  ngOnInit(): void {
    this.getPedidos();
    
  }

getPedidos(){
  this.cadena=localStorage.getItem("token");
  this.pedidosServices.getPedidos(this.cadena).subscribe(({pedidos,cantidad,total})=>{
    this.pedidos = pedidos;
    this.cantidad_carrito = cantidad;
    this.total=total;
     this.preloader=false;
 
     this.enviosGratis(this.total);
     
     if(cantidad==0){
      localStorage.setItem("productos","");
      window.location.href="";
     }else{
      localStorage.setItem("productos",cantidad.toString());
      this.contadorService.contadorS.emit(Number(localStorage.getItem("productos"))||0);

     }
     
  })
}
campoNoValido(campo : string): boolean{
  if(this.compra.get(campo).invalid && this.formSubmitted){
return true;
}else{
  return false;
}
}

validarTerminos(){
  
  return !this.compra.get('terminos').value && this.formSubmitted;
}

eventCheck($event){
if ($event.checked){
  tokenizador();
  setTimeout(() => {
  
  if(localStorage.getItem("tk")==""){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor revisa los datos de tu tarjeta y acepta los términos y condiciones',
      
    })
    $event.checked=false;
  }else{
    this.compra.patchValue({
      token_card:localStorage.getItem("tk")
    })
  }},1000);
   
}
}


onRegister(){
  this.formSubmitted=true;
  this.preloader2=true;
 this.compra.patchValue({
   token:localStorage.getItem("token"),
   total:this.total,
   fecha:this.getFecha
 })


 if(this.compra.invalid){
  Swal.fire('Error', 'Es posible que alguno de los campos no sea correcto', 'error');
  this.compra.patchValue({
    terminos:false,
  });
  this.preloader2=false;
   return;
 }

 this.verificacion= new Verification(this.compra.get('token').value,this.compra.get('email').value,this.getverificationNumber,false);
 this.verificationService.sendVerificationEmail(this.verificacion).subscribe((mensaje)=>{
  Swal.fire({
    allowOutsideClick: false,
    icon: 'success',
    title: mensaje.mensaje,
    confirmButtonText: `ok`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.validateEmail(this.verificacion.token)
    }
  })
 },(err) =>  Swal.fire('Error', err.error.msg, 'error').then(values =>{
    this.preloader2=false;
    this.compra.patchValue({
      terminos:false,
    });
  }))


}

enviosGratis(total:number){
if(total<500){
  this.envios=false;
  this.total=this.total+100;
}else{
  this.envios=true;
}
}

validateFormat(event) {
  let key;
  if (event.type === 'paste') {
    key = event.clipboardData.getData('text/plain');
  } else {
    key = event.keyCode;
    key = String.fromCharCode(key);
  }
  const regex = /[0-9]|\./;
   if (!regex.test(key)) {
    event.returnValue = false;
     if (event.preventDefault) {
      event.preventDefault();
     }
   }
  }

  validateLetra(event) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[A-Za-z ]|\./;
     if (!regex.test(key)) {
      event.returnValue = false;
       if (event.preventDefault) {
        event.preventDefault();
       }
     }
    }




  get getFecha():string{
   return this.fecha.toDateString();
  }

  get getverificationNumber (): number{
    return Math.floor(1000 + Math.random() * 9000);
  }

  borrarPedido(uid:string){
    Swal.fire({
      title: 'Esta a punto de borrar este producto, ¿Deseas continuar?',
      showDenyButton: true,
      confirmButtonText: `Borrar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.pedidosServices.borrarPedido(uid).subscribe((msg)=>{
          window.location.reload();
        })
      } else if (result.isDenied) {
        Swal.fire('No se guardaron los cambios', '', 'info')
      }
    })
  }


condiciones(){
  Swal.fire({
    title: '<strong>HTML <u>example</u></strong>',
    icon: 'info',
    html:
      '<h1>Terminos y condiciones</h1>, ' +
      '<p></p>' +
      'and other HTML tags',
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> Great!',
    confirmButtonAriaLabel: 'Thumbs up, great!',
    cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>',
    cancelButtonAriaLabel: 'Thumbs down'
  })
}

validateEmail(token:string){
  Swal.fire({
    allowOutsideClick: false,
    title: 'Verifique su correo electrónico',
    html: `<input type="text" id="verifyCode" class="swal2-input" placeholder="Ingrese el código de verificación">
    `,
    confirmButtonText: 'Continuar',
    focusConfirm: false,
    preConfirm: () => {
      const verifyCode = Swal.getPopup().querySelector('#verifyCode')as HTMLInputElement
      if (!verifyCode.value) {
        Swal.showValidationMessage(`Por favor ingrese un código de verificación`)
      }
      return { verifyCode: verifyCode.value }
    }
  }).then((result) => {
    this.sendValidationNumber(token,+result.value.verifyCode)
  })
}

finalizarVenta(){
  this.pedidosServices.agregarVenta(this.compra.value).subscribe(({mensaje,pago,correo})=>{
    this.preloader2=false;
    Swal.fire({
      allowOutsideClick: false,
      icon: 'success',
      title: mensaje+" pago status:"+pago+". Correo:"+correo,
      confirmButtonText: `ok`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        localStorage.setItem("token","");
        localStorage.setItem("productos","");
        localStorage.setItem("tk","");
        this.preloader2=false;
       window.location.href="";
      }
    })
   
  }, (err) =>  Swal.fire('Error', err.error.msg, 'error').then(values =>{
    this.preloader2=false;
    this.compra.patchValue({
      terminos:false,
    });
  })) ;
}
sendValidationNumber(token:string,numero:number){
  this.verificationService.sendNumberVerification(token,numero).subscribe((mensaje) =>{
    Swal.fire({
      allowOutsideClick: false,
      icon: 'success',
      title: mensaje.mensaje,
      confirmButtonText: `ok`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.finalizarVenta()
      }
    })
   },(err) =>  Swal.fire('Error', err.error.msg, 'error').then(values =>{
      this.preloader2=false;
      this.compra.patchValue({
        terminos:false,
      });
    }))
}
}

