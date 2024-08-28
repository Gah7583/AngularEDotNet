import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../interfaces/Usuario';
import { AutenticacaoServico } from '../../../servicos/autenticacao.servico';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = {} as Usuario;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required)
  });

  public logar(): void {
    if (this.form.valid) {
      this.usuario = { ... this.form.value };
      this.autenticacaoServico.login(this.usuario).subscribe(
        (response) => { console.log(response); }
      );
      this.router.navigate(['/tarefas/lista']);
    }
  }

  constructor(private autenticacaoServico: AutenticacaoServico, private router: Router) { }

  ngOnInit(): void {  }
}
