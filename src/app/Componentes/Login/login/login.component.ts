import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Clases/Usuario/usuario';
import { UsuariosService } from 'src/app/Servicios/Usuarios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario=new Usuario();
  constructor(private usuariosS:UsuariosService, private router:Router) { }

  ngOnInit(): void {
  }

  ValidarLogin(usuario:string, contrasena:string):void{
    this.usuariosS.Login(usuario, contrasena).subscribe(response=>{
      this.usuario=response;
      if(this.usuario.Id<=0){
        console.log('Datos incorrectos');
      }else{
        sessionStorage.setItem('Id',this.usuario.Id.toString());
        sessionStorage.setItem('Nombre',this.usuario.Nombre);
        sessionStorage.setItem('Usuario', this.usuario.User);
        console.log('Bienvenido');
        location.href='';
        // this.router.navigate(['Proyectos']);
      }
    });
  }

}
