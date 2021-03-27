import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroMembrosComponent } from './cadastro-membros/cadastro-membros.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroMembrosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
