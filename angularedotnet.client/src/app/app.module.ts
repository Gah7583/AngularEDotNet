import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TarefasComponent } from './tarefas/tarefas.component';
import { AtualizacaoComponent } from './atualizacao/atualizacao.component';
import { NavComponent } from './nav/nav.component';

import { TarefaServico } from './servicos/tarefa.servico';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TarefasComponent,
    AtualizacaoComponent,
    NavComponent
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
