import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateListPage } from './date-list.page';

const routes: Routes = [
  {
    path: '',
    component: DateListPage
  },
  {
    path: ':id',
    loadChildren: () => import('../../login/dash/info/info.module').then( m => m.InfoPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateListPageRoutingModule {}
