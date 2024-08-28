import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Usuario } from '../interfaces/Usuario';

@Injectable()

export class AutenticacaoServico {
  baseURL = 'https://localhost:7141/api/Autenticacao';
  constructor(private http: HttpClient) { }

  public login(model: Usuario): Observable<void> {
    return this.http.post<Usuario>(this.baseURL + '/signin', model).pipe(
      take(1),
      map((response: any) => {
        console.log(response);
      const user = response;
        if (user) {
          localStorage.setItem('userId', JSON.stringify(user));
          localStorage.setItem('token', JSON.stringify(user))
      }
    })
    );
  }
}
