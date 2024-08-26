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

  public postTarefa(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseURL, usuario);
  }

  public putTarefa(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.baseURL, usuario);
  }

  public deleteTarefa(id: any): Observable<string> {
    return this.http.delete<string>(`${this.baseURL}/${id}`);
  }
}
