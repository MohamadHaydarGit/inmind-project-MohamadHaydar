import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [

  {path: '', redirectTo: '/authentication/login', pathMatch: "full"},
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },


  {path: 'countries', loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)},

  { path: '**', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
