import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcercaComponent } from './Componentes/Acerca/acerca/acerca.component';
import { ContactoComponent } from './Componentes/Contacto/contacto/contacto.component';
import { InicioComponent } from './Componentes/Inicio/inicio/inicio.component';
import { LoginComponent } from './Componentes/Login/login/login.component';
import { MiPerfilComponent } from './Componentes/MiPerfil/mi-perfil/mi-perfil.component';
import { ProyectosComponent } from './Componentes/Proyectos/proyectos/proyectos.component';
import { RegistroComponent } from './Componentes/Registro/registro/registro.component';
import { TiposComponent } from './Componentes/Tipos/tipos/tipos.component';

const routes: Routes = [
  {path:'Proyectos', component:ProyectosComponent},
  {path:'Tipos', component:TiposComponent},
  {path:'Login', component:LoginComponent},
  {path:'', component:InicioComponent},
  {path:'MiPerfil', component:MiPerfilComponent},
  {path:'Acerca', component:AcercaComponent },
  {path:'Contacto', component:ContactoComponent},
  {path:'Registro', component:RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
