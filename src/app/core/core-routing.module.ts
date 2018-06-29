import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuModule} from 'primeng/menu';
const layoutRoutes: Routes = [
// {
//   path:'cart',
//  loadChildren: '../components/cart-list/cart-list.module#CartListModule'
// }
];

@NgModule({
  imports: [
    MenuModule,
    RouterModule.forChild(layoutRoutes)
  ],
  exports: [RouterModule,MenuModule],
  providers: [

  ]
})
export class CoreRoutingModule {}


