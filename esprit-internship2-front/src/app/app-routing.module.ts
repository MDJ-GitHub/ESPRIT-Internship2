import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FreightComponent } from './freight/freight.component';
import { PersonnelComponent } from './personnel/personnel.component';

const routes: Routes = [
  { path:'' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component : HomeComponent }, 
  { path: 'freight', component : FreightComponent },
  { path: 'personnel', component : PersonnelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
