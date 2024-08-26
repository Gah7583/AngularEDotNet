import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TarefasComponent } from './tarefas/tarefas.component';
import { AtualizacaoComponent } from './atualizacao/atualizacao.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'tarefas', component: TarefasComponent },
  { path: 'logar', component: LoginComponent },
  { path: 'atualizacao', component: AtualizacaoComponent },
  { path: '', redirectTo: 'logar', pathMatch: 'full' },
  { path: '**', redirectTo: 'logar', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
