import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacaoServico } from '../../../servicos/autenticacao.servico';
import { Usuario } from '../../../interfaces/Usuario';

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
      const observer = {
        next: () => this.toastr.success('Login feito com sucesso', 'Logado!'),
        error: (error: any) => console.log(error),
        complete: () => this.router.navigate(['/tarefas/lista'])
      }

      this.usuario = { ... this.form.value };
      this.autenticacaoServico.login(this.usuario).subscribe(observer)
    }
  }

  constructor(
    private autenticacaoServico: AutenticacaoServico,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }
}
