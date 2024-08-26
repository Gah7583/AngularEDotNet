import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TarefasComponent } from './components/tarefas/tarefas.component';
import { AtualizacaoComponent } from './components/atualizacao/atualizacao.component';
import { LoginComponent } from './components/login/login.component';
import { TarefaDetalheComponent } from './components/tarefas/tarefa-detalhe/tarefa-detalhe.component';
import { TarefaListaComponent } from './components/tarefas/tarefa-lista/tarefa-lista.component';
import { CadastroComponent } from './components/login/cadastro/cadastro.component';

const routes: Routes = [
  {
    path: 'tarefas', component: TarefasComponent,
    children: [
      { path: 'lista', component: TarefaListaComponent },
      { path: 'detalhe/:id', component: TarefaDetalheComponent }
    ]
  },
  {
    path: 'logar', component: LoginComponent,
    children: [
      { path: 'cadastro', component: CadastroComponent }
    ]
  },
  { path: 'atualizacao', component: AtualizacaoComponent },
  { path: '', redirectTo: 'logar', pathMatch: 'full' },
  { path: '**', redirectTo: 'logar', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
