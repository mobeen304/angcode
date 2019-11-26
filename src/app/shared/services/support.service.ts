import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable, Subject } from 'rxjs/Rx';
import { environment } from '../../../environments/environment.prod';
import { HttpInterceptor } from "../../shared/services/http-interceptor"
import { AuthService } from './auth.service';
import { NotificationsService } from 'angular2-notifications';

import { HeadersService } from '../../shared/services/headers.service';

@Injectable()
export class SupportService {
  error_message: string;
  constructor(public http: HttpInterceptor,
		public auth: AuthService,
		private notificationsService: NotificationsService,
		private headersService: HeadersService) { }
  


	public sendSupport(payload): Observable<any> {
		let url = environment.apiUrl + "/support";
		let options = this.headersService.postJSONWithAuth();
		return this.http.post(url, payload, options).map((response: any) => {
			console.log(response);
			return <any>response.json();
		}).catch((error: any) => this.handleError(error));
	}
	private handleError(error: any): Observable<any> {
		var type_error  = error.status.toString()[0];
        console.log(error);
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
