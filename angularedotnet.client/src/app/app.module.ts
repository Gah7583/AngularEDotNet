import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { TarefasComponent } from './components/tarefas/tarefas.component';
import { AtualizacaoComponent } from './components/usuario/atualizacao/atualizacao.component';
import { NavComponent } from './components/nav/nav.component';

import { TarefaServico } from './servicos/tarefa.servico';
import { UsuarioServico } from './servicos/usuario.servico';
import { AutenticacaoServico } from './servicos/autenticacao.servico';

import { DateFormatPipe } from './helpers/DateFormat.pipe';

import { TarefaDetalheComponent } from './components/tarefas/tarefa-detalhe/tarefa-detalhe.component';
import { TarefaListaComponent } from './components/tarefas/tarefa-lista/tarefa-lista.component';
import { CadastroComponent } from './components/usuario/cadastro/cadastro.component';
import { TarefaCriarComponent } from './components/tarefas/tarefa-criar/tarefa-criar.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

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
    UsuarioComponent,
    DateFormatPipe
  ],
  bootstrap: [AppComponent],
  imports: [BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple'}),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    })
  ],
  providers: [
    TarefaServico,
    UsuarioServico,
    AutenticacaoServico,
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule { }
