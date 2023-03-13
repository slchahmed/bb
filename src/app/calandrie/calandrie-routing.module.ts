import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalandriePage } from './calandrie.page';

const routes: Routes = [
  {
    path: '',
    component: CalandriePage
  },
  {
    path: ':date',
    loadChildren: () => import('./date-list/date-list.module').then( m => m.DateListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalandriePageRoutingModule {}
