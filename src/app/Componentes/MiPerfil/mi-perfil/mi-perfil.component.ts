import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Clases/Usuario/usuario';
import { UsuariosService } from 'src/app/Servicios/Usuarios/usuarios.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  usuario = new Usuario();

  cambiarContrasena: boolean = false;

  mostrarAlertC:boolean=false;

  respuestaC?:string;

  constructor(private usuarioS: UsuariosService) { }

  ngOnInit(): void {

    this.LlenarBotones();

  }

  LlenarBotones(): void {
    let id = sessionStorage.getItem('Id');
    let nombre = sessionStorage.getItem('Nombre')!;
    let usuario = sessionStorage.getItem('Usuario')!;

    this.usuario = { Id: Number(id), Nombre: nombre, User: usuario, Contrasena: 'Contrasena' };

  }

  CambiarContrasena(antiguaC: string, nuevaC: string, confirmarC: string): void {
    let id = Number(sessionStorage.getItem('Id'));
    this.usuarioS.Consultar(id).subscribe(response => {
      if (antiguaC === response.Contrasena) {
        if (nuevaC === confirmarC) {
          this.usuarioS.CambiarContrasena(id, nuevaC).subscribe(response => {
            if (response === 'Ok') {
              this.mostrarAlertC=true;
              this.cambiarContrasena=false;
              setTimeout(() => {
                this.mostrarAlertC=false;
              }, 8000);
              this.respuestaC='Le mot de passe a été mis à jour avec succès';
            } else {
              alert(response);
            }
          });
        } else {
          alert('Les mots de passe ne correspondent pas');
        }
      } else {
        alert("L'ancien mot de passe est erroné");
      }
    });
  }


}
