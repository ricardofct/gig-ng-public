import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'generator'
  },
  {
    path: 'generator',
    loadChildren: () => import('./generator/generator.module').then(({ GeneratorModule }) => GeneratorModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then(({ PaymentsModule }) => PaymentsModule)
  },
  {
    path: '**',
    redirectTo: 'generator'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
