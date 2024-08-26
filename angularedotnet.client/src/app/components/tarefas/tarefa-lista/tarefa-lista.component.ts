import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tarefa } from '../../../interfaces/Tarefa';
import { TarefaServico } from '../../../servicos/tarefa.servico';

@Component({
  selector: 'app-tarefa-lista',
  templateUrl: './tarefa-lista.component.html',
  styleUrls: ['./tarefa-lista.component.css']
})
export class TarefaListaComponent {
  public filtrandoTarefasConcluidas = false;

  ngOnInit(): void {
    this.getTarefas();
  }

  constructor(
    private tarefaServico: TarefaServico,
    private router: Router
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

  public getTarefa(id: any): void {
    this.tarefaServico.getTarefa(id);
    this.router.navigate([`/tarefas/detalhe/${id}`]);
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
