import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModelo } from '../modelos/usuario.model';
import { SeguridadService } from './seguridad.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { 
    this.token = this.seguridadService.getToken();
    }

    url = "http://localhost:3000"
    token: string = ''


//REGISTRAR USUARIOS
    store(usuario: UsuarioModelo): Observable<UsuarioModelo> {
      return this.http.post<UsuarioModelo>(`${this.url}/usuarios`, {
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        telefono: usuario.telefono,
        correo: usuario.correo
      });
    }


//OBTENER USUARIOS
    getAll(): Observable<UsuarioModelo[]>{
      return this.http.get<UsuarioModelo[]>(`${this.url}/usuarios`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

//ACTUALIZAR USUARIO

    update(usuario: UsuarioModelo): Observable<UsuarioModelo> {
      return this.http.patch<UsuarioModelo>(`${this.url}/usuarios/${usuario.id}`, {
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        telefono: usuario.telefono,
        correo: usuario.correo
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

//ELIMINAR USUARIO

delete(id: string): Observable<UsuarioModelo[]>{
  return this.http.delete<UsuarioModelo[]>(`${this.url}/usuarios/${id}`, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}


// CONSULTAR USUARIOS

getWithId(id: string): Observable<UsuarioModelo>{
  return this.http.get<UsuarioModelo>(`${this.url}/usuarios/${id}`,{
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.token}`
    })
  })
}


}
