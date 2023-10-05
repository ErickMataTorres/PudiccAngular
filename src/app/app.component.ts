import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mostrarNombre:string='';
  mostrarBoton:string='';
  nombre:string=sessionStorage.getItem('Nombre')!;

  mostrar?:boolean;

  constructor(private router:Router){}

  ngOnInit(): void {
    this.Sesion();
  }

  Sesion():void{
    if(this.nombre!==null){
      this.mostrar=true;
      this.mostrarNombre='display:block;';
      this.mostrarBoton='display:none;';
    }else{
      this.mostrar=false;
      this.mostrarNombre='display:none;';
      this.mostrarBoton='display:block;';
    }
  }

  CerrarSesion():void{
    sessionStorage.removeItem('Id');
    sessionStorage.removeItem('Nombre');
    location.href='';
  }

}


