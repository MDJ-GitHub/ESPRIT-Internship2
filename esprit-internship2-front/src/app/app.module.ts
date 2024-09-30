import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { FreightComponent } from './freight/freight.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { ResourceComponent } from './resource/resource.component';
import { ContainerComponent } from './container/container.component';
import { TrainComponent } from './train/train.component';
import { CarComponent } from './car/car.component';
import { AddFreightComponent } from './add-freight/add-freight.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    FreightComponent,
    PersonnelComponent,
    ResourceComponent,
    ContainerComponent,
    TrainComponent,
    CarComponent,
    AddFreightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
