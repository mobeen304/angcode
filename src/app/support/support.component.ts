import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';
import { MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';
import { SupportService } from '../shared/services/support.service';
import { NgForm} from '@angular/forms';

@Component({
	selector: 'app-support',
	templateUrl: './support.component.html',
	styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

	support: any = {
		name:  '',
		email: '',
		subject: '',
		meessag: ''
	}
	constructor(
	private supportServices:SupportService,private notificationsService: NotificationsService) { }

	ngOnInit() {
	}

	send(support:NgForm) {
	     this.supportServices.sendSupport(support.value).subscribe((new_model) => {
			 
			    console.log(new_model);
			    	this.notificationsService.success(
				new_model.Message,
				"&nbsp;",
				{
					timeOut: 2000,
					pauseOnHover: false,
					clickToClose: true,
				}
			);
			support.reset();
			});
		 console.log(support.value);
	}

}
