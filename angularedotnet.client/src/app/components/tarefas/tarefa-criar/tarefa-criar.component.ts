import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tarefa } from '../../../interfaces/Tarefa';

@Component({
  selector: 'app-tarefa-criar',
  templateUrl: './tarefa-criar.component.html',
  styleUrls: ['./tarefa-criar.component.css']
})
export class TarefaCriarComponent implements OnInit {
  form: FormGroup;
  constructor() { }

  ngOnInit(): void { }

  public validation(): void {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      descricao: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      dataDeRealizacao: new FormControl('', Validators.required)
    });
  }
}
