import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusPage } from './status.page';

const routes: Routes = [
  {
    path: '',
    component: StatusPage
  },
  {
    path: ':id',
    loadChildren: () => import('../dash/info/info.module').then( m => m.InfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatusPageRoutingModule {}
