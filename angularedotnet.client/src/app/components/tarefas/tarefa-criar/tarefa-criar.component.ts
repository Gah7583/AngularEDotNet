import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarefa } from '../../../interfaces/Tarefa';
import { TarefaServico } from '../../../servicos/tarefa.servico';
import { ToastrService } from 'ngx-toastr';

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
      const observer = {
        next: () => {
          this.toastr.success('Tarefa criada como sucesso', 'Criada');
          this.router.navigate(['/tarefas/lista'])
        },
        error: (error: any) => console.log(error)
      }

      this.tarefa = { ... this.form.value };
      this.tarefa.usuarioId = localStorage.getItem('userId');
      this.tarefaServico.postTarefa(this.tarefa).subscribe(observer);
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

  constructor(
    private tarefaServico: TarefaServico,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }
}
