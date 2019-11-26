/*******************************************************************************************************
  GENERAL MODULES
****************************************************************************************************************** */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http/src/http';
import { JwtModule } from '@auth0/angular-jwt';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ChartComponent} from './chart/chart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DndModule } from 'ngx-drag-drop';
//import { DoughnutChartComponent, PieChartComponent, BarChartComponent } from 'angular-d3-charts'; // this is needed!
/*******************************************************************************************************
  CUSTOM MODULES
****************************************************************************************************************** */
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routings';

/*******************************************************************************************************
  COMPONENTS
****************************************************************************************************************** */
import { AppComponent } from './app.component';

/*************************************************************************************************************
  PIPES
***************************************************************************************************** */
import { DatePipe } from '@angular/common';
 

 
 

/*************************************************************************************************************
  MODULE DECLARATION
***************************************************************************************************** */

@NgModule({
  declarations: [
    AppComponent,
   ChartComponent,
  /* DoughnutChartComponent, 
   PieChartComponent, 
   BarChartComponent
   
    */
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        /*
        tokenGetter: () => {
          return localStorage.getItem('currentUser');
        },*/
        whitelistedDomains: ['localhost:3001']
      }
    }),
    SimpleNotificationsModule.forRoot(),
    LoadingBarRouterModule,
    NgbModule.forRoot(),
    NgSelectModule,
    SharedModule,
    AppRoutingModule,
    DndModule 
  ],
  providers: [
    DatePipe,
  ],
  
  bootstrap: [AppComponent]
})

export class AppModule { }
