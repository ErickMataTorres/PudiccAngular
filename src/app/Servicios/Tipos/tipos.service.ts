import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipos } from 'src/app/Clases/Tipos/tipos';

@Injectable({
  providedIn: 'root'
})
export class TiposService {
  // url='https://localhost:44357';
  url='http://www.pudiccgb.somee.com';

  constructor(private http:HttpClient) { }

  Guardar(tipos: Tipos):Observable<string>{
    return this.http.post<string>(this.url+'/Tipo/Guardar', tipos);
  }

  Borrar(id:number):Observable<string>{
    return this.http.post<string>(this.url+'/Tipo/Borrar?id=' + id, null);
  }

  ListaTipos():Observable<Tipos[]>{
    return this.http.get<Tipos[]>(this.url+'/Tipo/ListaTipos');
  }

}
