import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrincipalComponent} from './conponents/principal/principal.component';
import {FormularioComponent} from './conponents/formulario/formulario.component';
import { GaleriaComponent } from './conponents/galeria/galeria.component';
import { VentaComponent } from './conponents/venta/venta.component';
import { ProductoComponent } from './conponents/producto/producto.component';
import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [
  {path:'principal',component:PrincipalComponent},
  {path:'formulario',component:FormularioComponent},
  {path:'galeria/:uid',component:GaleriaComponent},
  {path:'carrito',component:VentaComponent,canActivate:[GuardGuard]},
  {path:'Producto/:uid',component:ProductoComponent},
  {path:'**',pathMatch:'full',redirectTo:'principal'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
