import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalandriePage } from './calandrie.page';

const routes: Routes = [
  {
    path: '',
    component: CalandriePage
  },
  {
    path: ':id',
    loadChildren: () => import('../login/dash/info/info.module').then( m => m.InfoPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalandriePageRoutingModule {}
