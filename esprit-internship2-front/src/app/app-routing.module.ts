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
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path:'' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component : HomeComponent,  }, 
  { path: 'freight', component : FreightComponent, canActivate: [AuthGuard] },
  { path: 'freight/add', component : AddFreightComponent, canActivate: [AuthGuard] },
  { path: 'personnel', component : PersonnelComponent, canActivate: [AuthGuard] },
  { path: 'resource', component : ResourceComponent, canActivate: [AuthGuard] },
  { path: 'container', component : ContainerComponent, canActivate: [AuthGuard] },
  { path: 'train', component : TrainComponent, canActivate: [AuthGuard] },
  { path: 'car', component : CarComponent, canActivate: [AuthGuard] },
  { path: '**', component : HomeComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
