import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatTableModule,
	MatSortModule,
	MatButtonModule,
	MatIconModule,
	MatSlideToggleModule,
	MatTabsModule
} from '@angular/material';
import { HeaderModule } from '../header/header.module';
import { AdduserComponent} from './adduser.component';
 
  


import { AuthGuardService } from '../shared/services/auth-guard.service';
import { SuccessComponent } from './success/success.component';
import { AddnameComponent } from './addname/addname.component';
import { UsernameComponent } from './username/username.component';
import { InviteComponent } from './invite/invite.component';
import { AddCardComponent } from './add-card/add-card.component';
import { CardAddedComponent } from './card-added/card-added.component';
import { AddUserService } from '../shared/services/adduser.service';
 
 
 


@NgModule({
	imports: [
		CommonModule,
		MatTableModule,
		MatSortModule,
		MatButtonModule,
		MatIconModule,
		FormsModule,
		MatSlideToggleModule,
		MatTabsModule,
		HeaderModule,
		RouterModule.forChild([
			{
				path: 'adduser', component: AdduserComponent,
				//canActivate: [AuthGuardService],
				children: [
					{path: '', component: UsernameComponent},
					{path: 'useradded', component: SuccessComponent} ,
					{path: 'addname', component: AddnameComponent}, 
					{path: 'invite', component: InviteComponent}, 
					{path: 'add-card', component: AddCardComponent}, 
					{path: 'card-added', component: CardAddedComponent}, 
				 
					
				]
				  
			}
		] as Routes),
		ReactiveFormsModule

	],
	declarations: [
		AdduserComponent,
		SuccessComponent,
		AddnameComponent,
		UsernameComponent,
		InviteComponent,
		AddCardComponent,
		CardAddedComponent,
		 
	],
	providers:[
		AuthGuardService,
		AddUserService
		 
	],
	exports:[
	]
})
export class AddUserModule { }
