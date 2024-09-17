import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    this.getTarefasByUsuarioId(localStorage.getItem('userId'));
  }

  constructor(
    private tarefaServico: TarefaServico,
    private toastr: ToastrService
  ) { }

  public tarefas: Tarefa[] = [];

  public filtrarConcluidos(): void {
    if (this.filtrandoTarefasConcluidas) {
      this.getTarefasByUsuarioId(localStorage.getItem('userId'));
      this.filtrandoTarefasConcluidas = !this.filtrandoTarefasConcluidas;
    }
    else {
      this.tarefas = this.tarefas.filter(tarefa => tarefa.status === 1);
      this.filtrandoTarefasConcluidas = !this.filtrandoTarefasConcluidas;
    }
  };

  public getTarefasByUsuarioId(id: any): void {
    const observer = {
      next: (tarefas: Tarefa[]) => this.tarefas = tarefas,
      error: (error: any) => console.log(error)
    };
    this.tarefaServico.getTarefasByUsuarioId(id).subscribe(observer);
  }

  public patchTarefa(id: any): void {
    const observer = {
      next: () => {
        this.toastr.success('Tarefa concluída com sucesso.', 'Concluída!');
        this.getTarefasByUsuarioId(localStorage.getItem('userId')) },
      error: (error: any) => console.log(error)
    };
    this.tarefaServico.patchTarefa(id).subscribe(observer);
  }

  public deleteTarefa(id: any): void {
    const observer = {
      next: () => {
        this.toastr.success('Tarefa deletada com sucesso.', 'Deletada!');
        this.getTarefasByUsuarioId(localStorage.getItem('userId'))
      },
      error: (error: any) => console.log(error)
    };
    this.tarefaServico.deleteTarefa(id).subscribe(observer);
  }

}
