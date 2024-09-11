import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarefa } from '../../../interfaces/Tarefa';
import { TarefaServico } from '../../../servicos/tarefa.servico';

@Component({
  selector: 'app-tarefa-criar',
  templateUrl: './tarefa-criar.component.html',
  styleUrls: ['./tarefa-criar.component.css']
})
export class TarefaCriarComponent implements OnInit {
  tarefa = {} as Tarefa;

  form: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    descricao: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    dataDeRealizacao: new FormControl('', [Validators.required, this.dateValidator])
  });

  public salvarAlteracao(): void {
    if (this.form.valid) {
      this.tarefa = { ... this.form.value };
      this.tarefa.usuarioId = localStorage.getItem('userId');
      this.tarefaServico.postTarefa(this.tarefa).subscribe(
        (response) => console.log(response),
        (error: any) => {
          console.log(error);
        }
      );
      this.router.navigate(['/tarefas/lista']);
    }
  }

  dateValidator(control: any) {
    const today = new Date();
    const inputDate = new Date(control.value);
    if (control.value && inputDate < today) {
      return { pastDate: true };
    }
    return null;
  }

  constructor(private tarefaServico: TarefaServico, private router: Router) { }

  ngOnInit(): void { }
}
