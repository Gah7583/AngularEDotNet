import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Token } from '../interfaces/Token';
import { Usuario } from '../interfaces/Usuario';

@Injectable()

export class AutenticacaoServico {
  baseURL = 'https://localhost:7141/api/Autenticacao/v1';
  constructor(private http: HttpClient) { }

  public login(model: Usuario): Observable<void> {
    return this.http.post<Usuario>(this.baseURL + '/signin', model).pipe(
      take(1),
      map((response: any) => {
        const user = response;
        if (user) {
          const token: Token = user.item1;
          localStorage.setItem('userId', JSON.stringify(user.item2).replace(/"/g, ''));
          localStorage.setItem('bearer', JSON.stringify(token.acessToken).replace(/"/g, ''));
        }
      })
    );
  }
}
