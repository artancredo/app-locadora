import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocacaoPage } from './locacao.page';

const routes: Routes = [
  {
    path: '',
    component: LocacaoPage
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'cadastro/:id',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocacaoPageRoutingModule {}
