import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FreightComponent } from './freight/freight.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { ResourceComponent } from './resource/resource.component';
import { TrainComponent } from './train/train.component';
import { ContainerComponent } from './container/container.component';
import { CarComponent } from './car/car.component';
import { AddFreightComponent } from './add-freight/add-freight.component';

const routes: Routes = [
  { path:'' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component : HomeComponent }, 
  { path: 'freight', component : FreightComponent },
  { path: 'freight/add', component : AddFreightComponent },
  { path: 'personnel', component : PersonnelComponent },
  { path: 'resource', component : ResourceComponent },
  { path: 'container', component : ContainerComponent },
  { path: 'train', component : TrainComponent },
  { path: 'car', component : CarComponent },
  { path: '**', component : HomeComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
