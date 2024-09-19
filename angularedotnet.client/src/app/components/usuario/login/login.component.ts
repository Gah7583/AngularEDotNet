import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../interfaces/Usuario';
import { AutenticacaoServico } from '../../../servicos/autenticacao.servico';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
    const observer = {
      error: () => {
        this.spinner.hide();
        this.toastr.error('Erro ao tentar logar', 'Erro!')
      },
      complete: () => {
        this.spinner.hide();
        if (localStorage.getItem('userId') !== null) {
          this.toastr.success('Logado com sucesso.', 'Sucesso!');
          this.router.navigate(['/tarefas/lista']);
        } else this.toastr.error('Usuário ou senha inválidos.', 'Erro!')
      }
    }
    if (this.form.valid) {
      this.spinner.show()
      this.usuario = { ... this.form.value };
      this.autenticacaoServico.login(this.usuario).subscribe(observer);
    }
  }

  constructor(
    private autenticacaoServico: AutenticacaoServico,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void { localStorage.clear(); }
}
