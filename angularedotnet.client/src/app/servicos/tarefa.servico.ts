import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from '../interfaces/Tarefa';

@Injectable()

export class TarefaServico {
  baseURL = 'https://localhost:7141/api/Tarefas';
  constructor(private http: HttpClient) { }

  public getTarefasByUsuarioId(usuarioId: any): Observable<Tarefa[]> {
    var url = (`${this.baseURL}/usuario/` + usuarioId);
    console.log(url);
    return this.http.get<Tarefa[]>(`${this.baseURL}/usuario/` + usuarioId);
  }

  public getTarefa(id: any): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.baseURL}/${id}`);
  }

  public postTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.baseURL, tarefa);
  }

  public putTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(this.baseURL, tarefa);
  }

  public patchTarefa(id: any): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${this.baseURL}/${id}`, id);
  }

  public deleteTarefa(id: any): Observable<string> {
    return this.http.delete<string>(`${this.baseURL}/${id}`);
  }
}
