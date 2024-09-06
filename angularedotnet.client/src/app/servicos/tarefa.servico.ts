import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from '../interfaces/Tarefa';

@Injectable()

export class TarefaServico {
  baseURL = 'https://localhost:7141/api/Tarefas/v1';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bearer')
  }) }

  constructor(private http: HttpClient) { }

  public getTarefasByUsuarioId(usuarioId: string): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.baseURL}/usuario/${usuarioId}`, this.httpOptions);
  }

  public getTarefa(id: any): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.baseURL}/${id}`, this.httpOptions);
  }

  public postTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.baseURL, tarefa, this.httpOptions);
  }

  public putTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(this.baseURL, tarefa, this.httpOptions);
  }

  public patchTarefa(id: any): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${this.baseURL}/${id}`, id, this.httpOptions);
  }

  public deleteTarefa(id: any): Observable<string> {
    return this.http.delete<string>(`${this.baseURL}/${id}`, this.httpOptions);
  }
}
