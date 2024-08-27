import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../../interfaces/Tarefa';
import { TarefaServico } from '../../../servicos/tarefa.servico';

@Component({
  selector: 'app-tarefa-lista',
  templateUrl: './tarefa-lista.component.html',
  styleUrls: ['./tarefa-lista.component.css']
})
export class TarefaListaComponent implements OnInit {
  public filtrandoTarefasConcluidas = false;

  ngOnInit(): void {
    this.getTarefas();
  }

  constructor(
    private tarefaServico: TarefaServico,
  ) { }

  public tarefas: Tarefa[] = [];

  public filtrarConcluidos(): void {
    if (this.filtrandoTarefasConcluidas) {
      this.getTarefas();
      this.filtrandoTarefasConcluidas = !this.filtrandoTarefasConcluidas;
    }
    else {
      this.tarefas = this.tarefas.filter(tarefa => tarefa.status === 1);
      this.filtrandoTarefasConcluidas = !this.filtrandoTarefasConcluidas;
    }
  };

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

  public patchTarefa(id: any): void {
    this.tarefaServico.patchTarefa(id).subscribe(
      (response) => console.log(response)
    );
    this.getTarefas();
  }

  public deleteTarefa(id: any): void {
    this.tarefaServico.deleteTarefa(id).subscribe(
      (response) => console.log(response)
    );
    this.getTarefas();
  }

}
