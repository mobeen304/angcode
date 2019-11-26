import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';

import { environment } from '../../environments/environment';

@Component({
	selector: 'app-timeinterval',
	templateUrl: 'time-interval.component.html',
	styleUrls: ['time-interval.component.scss']
})
export class TimeIntervalComponent implements OnInit, OnDestroy {
	
	private _subscriptions: Subscription[] = [];
     id: string;
     model_type: string;

	constructor(
		public auth: AuthService,
		public router: Router,
		private messagesService: MessagesService,
	) {

	}

	ngOnInit(): void {
		// this.router.params.subscribe(params => this.id = params['id'];this.model_type = params['model_type'];);
		
	}
	
  
	ngOnDestroy() {
		this._subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}
