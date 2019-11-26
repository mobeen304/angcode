import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable, Subject } from 'rxjs/Rx';

import { environment } from '../../../environments/environment.prod';

import { HttpInterceptor } from "../../shared/services/http-interceptor"
import { AuthService } from '../../shared/services/auth.service';
import { NotificationsService } from 'angular2-notifications';

import { Train } from '../../shared/models/train.model';

import { HeadersService } from '../../shared/services/headers.service';

@Injectable()
export class TrainsService {

	trains: Train[];
	predicts: String[];
	error_message: string;
	constructor(
		public http: HttpInterceptor,
		public auth: AuthService,
		private notificationsService: NotificationsService,
		private headersService: HeadersService
	) { }

	public train(model_id): Observable<any> {
		let url = environment.apiUrl+"/train/"+model_id;
		let options = this.headersService.getWithAuth();
		return this.http.get(url,options).map((response: any) => {
			this.trains = response.json();
			return this.trains;
		}).catch((error: any) => this.handleError(error));
	}

	public trainResult(model_id): Observable<any> {
		let url = environment.apiUrl+"/results/"+model_id;
		let options = this.headersService.getWithAuth();
		return this.http.get(url,options).map((response: any) => {
			return response.json();
			 
		}).catch((error: any) => this.handleError(error));
	}

	public predict(model_id): Observable<any> {
		let url = environment.apiUrl+"/predict/"+model_id;
		let options = this.headersService.getWithAuth();
		return this.http.get(url,options).map((response: any) => {
			this.predicts = <any>response.json();
			return this.predicts;
			
		}).catch((error: any) => this.handleError(error));
	}
	public cancelTraining(model_id): Observable<any> {
		let url = environment.apiUrl+"/train/"+model_id;
		let options = this.headersService.getWithAuth();
		return this.http.get(url,options).map((response: any) => {
			var x = <any>response.json();
			console.log(x)
		}).catch((error: any) => this.handleError(error));
	}

	
	private handleError(error: any): Observable<any> {
		var type_error  = error.status.toString()[0];

		this.error_message = type_error != 5 ? error._body : environment.msgErrors.server;
		console.log(this.error_message);
		this.notificationsService.error(
			'&nbsp;',
			this.error_message,
			{
				timeOut: 3000,
				pauseOnHover: false,
				clickToClose: false,
			}
		);
		return Observable.throw(new Error(error.status));
	}

}
