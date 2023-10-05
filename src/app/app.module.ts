import {HttpClientModule} from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProyectosComponent } from './Componentes/Proyectos/proyectos/proyectos.component';

// import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
// import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
// import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
// import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
// import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
// import {MatSortModule} from '@angular/material/sort';
// import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
// import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
// import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio';
import {MatIconModule} from '@angular/material/icon';
// import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';








import { TiposComponent } from './Componentes/Tipos/tipos/tipos.component';
import { LoginComponent } from './Componentes/Login/login/login.component';
import { InicioComponent } from './Componentes/Inicio/inicio/inicio.component';
import { MiPerfilComponent } from './Componentes/MiPerfil/mi-perfil/mi-perfil.component';
import { AcercaComponent } from './Componentes/Acerca/acerca/acerca.component';
import { ContactoComponent } from './Componentes/Contacto/contacto/contacto.component';
import { RegistroComponent } from './Componentes/Registro/registro/registro.component';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    ProyectosComponent,
    TiposComponent,
    LoginComponent,
    InicioComponent,
    MiPerfilComponent,
    AcercaComponent,
    ContactoComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // FormsModule,
    // BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    // MatCardModule,
    MatDialogModule,
    // MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatIconModule,
    // MatCheckboxModule,
    // ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
