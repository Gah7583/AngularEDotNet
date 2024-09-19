import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../interfaces/Usuario';
import { UsuarioServico } from '../../../servicos/usuario.servico';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  usuario = {} as Usuario;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(320)]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  public salvarUsuario(): void {
    if (this.form.valid) {
      const observer = {
        error: () => this.toastr.error('Erro ao tentar criar um usuário', 'Erro!'),
        complete: () => {
          this.toastr.success('Usuário criado com sucesso', "Criado");
          this.router.navigate(['/usuario/logar']);
        }
      }

      this.usuario = { ... this.form.value };
      this.usuarioServico.postUsuario(this.usuario).subscribe(observer);
    }
  }

  constructor(
    private usuarioServico: UsuarioServico,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }
}
