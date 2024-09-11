import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { TarefasComponent } from './components/tarefas/tarefas.component';
import { AtualizacaoComponent } from './components/usuario/atualizacao/atualizacao.component';
import { NavComponent } from './components/nav/nav.component';

import { TarefaServico } from './servicos/tarefa.servico';
import { UsuarioServico } from './servicos/usuario.servico';

import { TarefaDetalheComponent } from './components/tarefas/tarefa-detalhe/tarefa-detalhe.component';
import { TarefaListaComponent } from './components/tarefas/tarefa-lista/tarefa-lista.component';
import { CadastroComponent } from './components/usuario/cadastro/cadastro.component';
import { TarefaCriarComponent } from './components/tarefas/tarefa-criar/tarefa-criar.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AutenticacaoServico } from './servicos/autenticacao.servico';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TarefasComponent,
    AtualizacaoComponent,
    NavComponent,
    TarefaDetalheComponent,
    TarefaListaComponent,
    CadastroComponent,
    TarefaCriarComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    })
  ],
  providers: [TarefaServico, UsuarioServico, AutenticacaoServico],
  bootstrap: [AppComponent]
})
export class AppModule { }
