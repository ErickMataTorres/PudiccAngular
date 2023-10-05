import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Miembro } from 'src/app/Clases/Miembro/miembro';
import { Usuario } from 'src/app/Clases/Usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // url='https://localhost:44357';
  url='http://www.pudiccgb.somee.com';
  constructor(private http:HttpClient) { }

  Login(usuario:string, contrasena:string):Observable<Usuario>{
    return this.http.get<Usuario>(this.url+'/Usuario/Login?usuario='+usuario+'&contrasena='+contrasena);
  }

  Consultar(id: number):Observable<Usuario>{
    return this.http.get<Usuario>(this.url+'/Usuario/Consultar?id='+id);
  }

  CambiarContrasena(id:number, contrasena: string):Observable<string>{
    return this.http.get<string>(this.url+'/Usuario/CambiarContrasena?id='+id+'&contrasena='+contrasena);
  }

  ConsultarMiembro(nomPrenom: string, nifCin: string):Observable<Miembro>{
    return this.http.get<Miembro>(this.url + '/Miembro/ConsultarMiembro?nomPrenom='+nomPrenom+'&nifCin='+nifCin);
  }

}
