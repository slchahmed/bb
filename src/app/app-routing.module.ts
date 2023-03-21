import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {canActivate ,redirectUnauthorizedTo,redirectLoggedInTo} from '@angular/fire/auth-guard'

const redirectTodash = ()=> redirectLoggedInTo(['dash'])
const redirectToLogin =()=> redirectUnauthorizedTo([''])
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectTodash)
  },
  
  {
    path: 'dash',
    loadChildren: () => import('./login/dash/dash.module').then( m => m.DashPageModule),
    ...canActivate(redirectToLogin)
  },
  {
    path: 'status',
    loadChildren: () => import('./login/status/status.module').then( m => m.StatusPageModule),
    ...canActivate(redirectToLogin)
  },
  {
    path: 'calandrie',
    loadChildren: () => import('./calandrie/calandrie.module').then( m => m.CalandriePageModule),
    ...canActivate(redirectToLogin)
  },
  {
    path: 'stats',
    loadChildren: () => import('./stats/stats.module').then( m => m.StatsPageModule)
  },
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
