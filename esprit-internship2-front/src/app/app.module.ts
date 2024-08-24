import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    TrainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
