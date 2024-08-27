import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../interfaces/Usuario';
import { UsuarioServico } from '../../../servicos/usuario.servico';

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
      this.usuario = { ... this.form.value };
      this.usuarioServico.postUsuario(this.usuario).subscribe(
        (response) => console.log(response),
        (error: any) => console.log(error)
      );
      this.router.navigate(['/usuario/logar']);
    }
  }

  constructor(private usuarioServico: UsuarioServico, private router: Router) { }

  ngOnInit(): void { }
}
