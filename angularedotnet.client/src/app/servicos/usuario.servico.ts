import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/Usuario';

@Injectable()

export class UsuarioServico {
  baseURL = 'https://localhost:7141/api/Usuario';
  constructor(private http: HttpClient) { }

  public getUsuario(id: any): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseURL}/${id}`);
  }

  public postUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseURL, usuario);
  }

  public putUsuario(usuario: Usuario): Observable<Usuario> {
    console.log(usuario.genero);
    usuario.genero = Number(usuario.genero);
    console.log(usuario);
    return this.http.put<Usuario>(this.baseURL, usuario);
  }

  public deleteUsuario(id: any): Observable<string> {
    return this.http.delete<string>(`${this.baseURL}/${id}`);
  }
}
