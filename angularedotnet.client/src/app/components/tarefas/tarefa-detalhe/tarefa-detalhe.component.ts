import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Tarefa } from '../../../interfaces/Tarefa';

@Component({
  selector: 'app-tarefa-detalhe',
  templateUrl: './tarefa-detalhe.component.html',
  styleUrls: ['./tarefa-detalhe.component.css']
})
export class TarefaDetalheComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  constructor() { }

  ngOnInit(): void {}

  public validation(): void {
    this.form = new FormGroup({
      nome: new FormControl(),
      descricao: new FormControl(),
      dataDeRealizacao: new FormControl()
});
  }
}
