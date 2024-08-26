import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../interfaces/Tarefa';
import { TarefaServico } from '../servicos/tarefa.servico';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {


  ngOnInit(): void {
    this.getTarefas();
  }

  constructor(
    private tarefaServico: TarefaServico
  ) { }

  public tarefas: Tarefa[] = [];

  public getTarefas(): void {
    const observer = {
      next: (tarefas: Tarefa[]) => {
        this.tarefas = tarefas;
      },
      error: (error: any) => console.log(error)
    };
    this.tarefaServico.getTarefas().subscribe(observer);
  }

  public getTarefasByUsuarioId(id: any): void {
    const observer = {
      next: (tarefas: Tarefa[]) => {
        this.tarefas = tarefas;
      },
      error: (error: any) => console.log(error)
    };
    this.tarefaServico.getTarefasByUsuarioId(id).subscribe(observer);
  }

  public getTarefa(id: any): void {
    this.tarefaServico.getTarefa(id);
  }

  public postTarefa(): void {
    let tarefa: Tarefa = {
      nome: "teste",
      descricao: "Teste para ver se o problema é o GUID",
      dataDeRealizacao: "2024-08-26",
      status: 1,
      usuarioId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6"
    }

    this.tarefaServico.postTarefa(tarefa);
    this.getTarefas();
  }

  public putTarefa(): void { }

  public patchTarefa(id: any): void {
    this.tarefaServico.patchTarefa(id)
    this.getTarefas();
  }

  public deleteTarefa(id: any): void {
    this.tarefaServico.deleteTarefa(id);
    this.getTarefas();
  }
}
