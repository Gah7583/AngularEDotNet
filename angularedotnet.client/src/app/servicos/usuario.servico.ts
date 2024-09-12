import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/Usuario';

@Injectable()

export class UsuarioServico {
  baseURL = 'https://localhost:7141/api/Usuario/v1';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bearer')
    })
  }

  constructor(private http: HttpClient) { }

  public getUsuario(id: any): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseURL}/${id}`, this.httpOptions);
  }

  public postUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseURL, usuario, this.httpOptions);
  }

  public putUsuario(usuario: Usuario): Observable<Usuario> {
    usuario.genero = Number(usuario.genero);
    return this.http.put<Usuario>(this.baseURL, usuario, this.httpOptions);
  }
}
