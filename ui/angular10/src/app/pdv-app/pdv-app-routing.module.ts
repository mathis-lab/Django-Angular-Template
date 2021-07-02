import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FicheComponent } from './fiche/fiche.component';
import { PdvAppComponent } from './pdv-app.component';

const routes: Routes = [
  {path:'', component:PdvAppComponent, children:[
    {path:'', component:FicheComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdvAppRoutingModule { }