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
    this.getTarefasByUsuarioId(localStorage.getItem('id'));
  }

  constructor(
    private tarefaServico: TarefaServico,
  ) { }

  public tarefas: Tarefa[] = [];

  public filtrarConcluidos(): void {
    if (this.filtrandoTarefasConcluidas) {
      this.getTarefasByUsuarioId(localStorage.getItem('id'));
      this.filtrandoTarefasConcluidas = !this.filtrandoTarefasConcluidas;
    }
    else {
      this.tarefas = this.tarefas.filter(tarefa => tarefa.status === 1);
      this.filtrandoTarefasConcluidas = !this.filtrandoTarefasConcluidas;
    }
  };

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
    this.getTarefasByUsuarioId(localStorage.getItem('id'));
  }

  public deleteTarefa(id: any): void {
    this.tarefaServico.deleteTarefa(id).subscribe(
      (response) => console.log(response)
    );
    this.getTarefasByUsuarioId(localStorage.getItem('id'));
  }

}
