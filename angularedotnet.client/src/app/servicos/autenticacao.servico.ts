import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/Usuario';

@Injectable()

export class AutenticacaoServico {
  baseURL = 'https://localhost:7141/api/Autenticacao';
  constructor(private http: HttpClient) { }

  public login(model: any): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseURL + '/login', model);
  }
}
