import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TarefasComponent } from './components/tarefas/tarefas.component';
import { AtualizacaoComponent } from './components/usuario/atualizacao/atualizacao.component';
import { TarefaDetalheComponent } from './components/tarefas/tarefa-detalhe/tarefa-detalhe.component';
import { TarefaListaComponent } from './components/tarefas/tarefa-lista/tarefa-lista.component';
import { TarefaCriarComponent } from './components/tarefas/tarefa-criar/tarefa-criar.component';

import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { CadastroComponent } from './components/usuario/cadastro/cadastro.component';

const routes: Routes = [
  { path: 'tarefas', redirectTo: 'tarefas/lista' },
  {
    path: 'tarefas', component: TarefasComponent,
    children: [
      { path: 'lista/:id', component: TarefaListaComponent },
      { path: 'detalhe/:id', component: TarefaDetalheComponent },
      { path: 'criar', component: TarefaCriarComponent }
    ]
  },
  { path: 'usuario', redirectTo: 'usuario/logar' },
  {
    path: 'usuario', component: UsuarioComponent,
    children: [
      { path: 'logar', component: LoginComponent },
      { path: 'cadastro', component: CadastroComponent },
      { path: 'atualizacao', component: AtualizacaoComponent }
    ]
  },
  { path: '', redirectTo: 'usuario/logar', pathMatch: 'full' },
  { path: '**', redirectTo: 'usuario/logar', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
