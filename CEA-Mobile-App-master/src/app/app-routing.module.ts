import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then(m => m.EventsPageModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions.module').then( m => m.TransactionsPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'payment-successful',
    loadChildren: () => import('./payment-successful/payment-successful.module').then( m => m.PaymentSuccessfulPageModule)
    
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then(m => m.EventsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./signup1/signup1.module').then(m => m.Signup1PageModule)
  // },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },

  {
    path: 'dcreg',
    loadChildren: () => import('./DepCoordRegComp/signup1.module').then( m => m.Signup1PageModule)
  },
  {
    path: 'digital-coupons',
    loadChildren: () => import('./digital-coupons/digital-coupons.module').then( m => m.DigitalCouponsPageModule)
  },
  {
    path: 'departments',
    loadChildren: () => import('./department-list/department-list.module').then( m => m.DepartmentListPageModule)
  },
  {
    path: 'departments/:dept',
    loadChildren: () => import('./team-members/team-members.module').then( m => m.TeamMembersPageModule)
  },
  {
    path: 'enter-id',
    loadChildren: () => import('./enter-id/enter-id.module').then( m => m.EnterIdPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
