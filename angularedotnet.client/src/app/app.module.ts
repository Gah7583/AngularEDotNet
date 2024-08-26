import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TarefasComponent } from './components/tarefas/tarefas.component';
import { AtualizacaoComponent } from './components/atualizacao/atualizacao.component';
import { NavComponent } from './components/nav/nav.component';

import { TarefaServico } from './servicos/tarefa.servico';
import { TarefaDetalheComponent } from './components/tarefas/tarefa-detalhe/tarefa-detalhe.component';
import { TarefaListaComponent } from './components/tarefas/tarefa-lista/tarefa-lista.component';
import { CadastroComponent } from './components/login/cadastro/cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TarefasComponent,
    AtualizacaoComponent,
    NavComponent,
    TarefaDetalheComponent,
    TarefaListaComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [TarefaServico],
  bootstrap: [AppComponent]
})
export class AppModule { }
