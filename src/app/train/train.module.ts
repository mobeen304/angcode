import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {
	MatTableModule,
	MatSortModule,
	MatButtonModule,
	MatIconModule,
	MatSlideToggleModule,
	MatTabsModule
} from '@angular/material';
import { HeaderModule } from '../header/header.module';
import { TrainComponent} from './train.component';
import { TrainingComponent} from './training/training.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { CurrenttrainingComponent } from './currenttraining/currenttraining.component';
import { TrainingresultComponent } from './trainingresult/trainingresult.component';
import { TrainsService } from '../shared/services/train.service';
  
import { DoughnutChartComponent, PieChartComponent, BarChartComponent } from 'angular-d3-charts'; // this is needed!


@NgModule({
	imports: [
		CommonModule,
		MatTableModule,
		MatSortModule,
		MatButtonModule,
		MatIconModule,
		MatSlideToggleModule,
		MatTabsModule,
		HeaderModule,
		RouterModule.forChild([
			{
				path: 'training', component: TrainComponent,
				canActivate: [AuthGuardService],
				children: [
					{path: ':id', component: TrainingComponent},
					{path: 'currenttraining/:id', component: CurrenttrainingComponent},
					{path: 'trainingresult/:id', component: TrainingresultComponent}
				]
				  
			}
		] as Routes),

	],
	declarations: [
		TrainComponent,
		TrainingComponent,
		CurrenttrainingComponent,
		TrainingresultComponent,
		 
    DoughnutChartComponent,
    PieChartComponent, 
    BarChartComponent
	],
	providers:[
		AuthGuardService,
		 TrainsService
	],
	exports:[
	]
})
export class TrainModule { }
