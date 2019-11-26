import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DndModule } from 'ngx-drag-drop';
import {
	MatTableModule,
	MatSortModule,
	MatButtonModule,
	MatIconModule,
	MatSlideToggleModule,
	MatTabsModule
} from '@angular/material';
import { HeaderModule } from '../header/header.module';

import { TimeIntervalComponent} from './time-interval.component';
import { IntradayComponent } from './intraday/intraday.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { IntervalComponent } from './interval/interval.component';
 
 


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
		DndModule,
		RouterModule.forChild([
			{
				path: 'timeinterval', component: TimeIntervalComponent,
				canActivate: [AuthGuardService],
				children: [
					{path: ':type/:id', component: IntervalComponent} ,
					{path: 'intraday/:model_type/:type/:id', component: IntradayComponent}, 
					{path: 'intraday/:model_type/:id', component: IntradayComponent}, 
					 
				
					
				]
				  
			}
		] as Routes),

	],
	declarations: [
		TimeIntervalComponent,
		IntradayComponent,
		IntervalComponent,
		 
		
	],
	providers:[
		AuthGuardService,
		 
	],
	exports:[
	]
})
export class TimeIntervalModule { }
