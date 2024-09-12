import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../interfaces/Usuario';
import { UsuarioServico } from '../../../servicos/usuario.servico';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css']
})
export class AtualizacaoComponent implements OnInit {
  usuario = {} as Usuario;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(320)]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
    telefone: new FormControl('', this.phoneValidator),
    dataDeNascimento: new FormControl('', this.dateValidator),
    genero: new FormControl()
  });

  constructor(private activetedRouter: ActivatedRoute, private usuarioServico: UsuarioServico, private router: Router) { }

  public carregarUsuario(): void {
    this.usuarioServico.getUsuario(localStorage.getItem('userId')).subscribe((usuario: Usuario) => {
        this.usuario = { ...usuario };
        this.form.patchValue(this.usuario);
      })
  }

  public salvarAlteracao(): void {
    if (this.form.valid) {
      this.usuario = { ... this.usuario, ... this.form.value };
      this.usuarioServico.putUsuario(this.usuario).subscribe((response) => console.log(response), (error: any) => console.log(error));
      this.router.navigate(['/usuario/atualizacao']);
    }
  }

  phoneValidator(control: any) {
    const phonePattern = /^\(\d{ 2 } \) \d{ 5 } -\d{ 4 } $/;
    if (!control.value || phonePattern.test(control.value)) {
      return null;
    }
    return { invalidPhone: true };
  }

  dateValidator(control: any) {
    const today = new Date();
    const inputDate = new Date(control.value);
    if (control.value && inputDate < today) {
      return null;
    }
    return { futureDate: true };
  }

  ngOnInit(): void { this.carregarUsuario() }

}
