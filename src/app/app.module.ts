import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule}from '@angular/forms';
import { PrincipalComponent } from './conponents/principal/principal.component';
import { FormularioComponent } from './conponents/formulario/formulario.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import {RegistroService} from './services/registro.service';
import { GaleriaComponent } from './conponents/galeria/galeria.component';
import { VentaComponent } from './conponents/venta/venta.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProductoComponent } from './conponents/producto/producto.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    FormularioComponent,
    CuerpoComponent,
    GaleriaComponent,
    VentaComponent,
    FooterComponent,
    HeaderComponent,
    ProductoComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
 	AngularFireDatabaseModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressBarModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
  ],
  providers: [RegistroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
