import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarefa } from '../../../interfaces/Tarefa';
import { TarefaServico } from '../../../servicos/tarefa.servico';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarefa-detalhe',
  templateUrl: './tarefa-detalhe.component.html',
  styleUrls: ['./tarefa-detalhe.component.css']
})
export class TarefaDetalheComponent implements OnInit {
  tarefa = {} as Tarefa;
  form: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    descricao: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    dataDeRealizacao: new FormControl('', [Validators.required, this.dateValidator])
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private tarefaServico: TarefaServico,
    private router: Router,
    private toastr: ToastrService
  ) { }

  public carregarTarefa(): void {
    const tarefaIdParam = this.activatedRoute.snapshot.paramMap.get('id');

    if (tarefaIdParam !== null) {
      this.tarefaServico.getTarefa(tarefaIdParam).subscribe((tarefa: Tarefa) => {
        this.tarefa = { ...tarefa };
        this.form.patchValue(this.tarefa);
      })
    }
  }

  public salvarAlteracao(): void {
    if (this.form.valid) {
      const observer = {
        next: () => {
          this.toastr.success('Tarefa atualizada com sucesso', 'Atualizada!');
          this.router.navigate(['/tarefas/lista'])
        },
        error: (error: any) => console.log(error)
      }

      this.tarefa = { ...this.tarefa, ... this.form.value };
      this.tarefaServico.putTarefa(this.tarefa).subscribe(observer)
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

  ngOnInit(): void { this.carregarTarefa() }
}
