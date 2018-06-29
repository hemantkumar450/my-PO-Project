import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
// import { LayoutComponent } from './layout/layout.component';
import { BaseComponent } from './components/base.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthCheckForPermission } from './auth/auth-check-for-permission.service';
import { ForbiddenComponent } from './auth/forbidden/forbidden.component';


const appRoutes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'permission', pathMatch: 'full'
      },
      {
        path: 'permission',
        loadChildren: './components/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthCheckForPermission]
      },
      {
        path: 'home',
        loadChildren: './components/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'vendor',
        loadChildren: './components/vendor/vendor.module#VendorModule'
      },
      {
        path: 'cart',
        loadChildren: './components/cart-list/cart-list.module#CartListModule'
      },
      {
        path: 'product',
        loadChildren: './components/product/product.module#ProductModule'
      },
      {
        path: 'user',
        loadChildren: './components/user/user.module#UserModule'
      },
      {
        path: 'rfq',
        loadChildren: './components/request-for-quote/request-for-quote.module#RequestQuoteModule'
      },
      {
        path: 'admin',
        loadChildren: './components/admin/admin.module#AdminModule'
      },
      {
        path: 'categories',
        loadChildren: './components/categories/categories.module#CategoriesModule'
      },
      {
        path: 'forbidden',
        component: ForbiddenComponent
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload', useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule {

}



