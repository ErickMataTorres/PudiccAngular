import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyectos } from 'src/app/Clases/Proyectos/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  // url='https://localhost:44357';
  url='http://www.pudiccgb.somee.com';

  constructor(private http:HttpClient) { }

  CardsPublicacion(idTipo:number):Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(this.url+'/Publicacion/CardsPublicacion?idTipo=' + idTipo);
  }

  Borrar(id:number):Observable<string>{
    return this.http.get<string>(this.url + '/Publicacion/Borrar?Id='+id);
  }

}
