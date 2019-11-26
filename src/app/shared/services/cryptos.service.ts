import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable, Subject } from 'rxjs/Rx';

import { environment } from '../../../environments/environment.prod';

import { HttpInterceptor } from "../../shared/services/http-interceptor"
import { AuthService } from '../../shared/services/auth.service';
import { NotificationsService } from 'angular2-notifications';

import { Crypto }           from '../../shared/models/crypto.model';

import { HeadersService } from '../../shared/services/headers.service';

@Injectable()
export class CryptosService {

	cryptos: Crypto[];
	error_message: string;
	constructor(
		public http: HttpInterceptor,
		public auth: AuthService,
		private notificationsService: NotificationsService,
		private headersService: HeadersService
	) { }

	public getList(): Observable<Crypto[]> {
		let url = environment.apiUrl+"/crypto";
		let options = this.headersService.getWithAuth();
		return this.http.get(url,options).map((response: any) => {
			this.cryptos = <Crypto[]>response.json().crypto;
			return this.cryptos;
		}).catch((error: any) => this.handleError(error));
	}

	public create(name:string): Observable<any> {
		let url = environment.apiUrl + "/crypto/" + name;
		let options = this.headersService.postJSONWithAuth();
		return this.http.post(url, {}, options).map((response: any) => {
			let model = <any>response.json();
			return {id: model.ModelId, name: model.ModelName, variables: model.Variables, data: name};
		}).catch((error: any) => this.handleError(error));
	}
   public updateCryptos(payload,cryptoId): Observable<any> {
		let url = environment.apiUrl+"/crypto/"+cryptoId;
		let options = this.headersService.getWithAuth();
		return this.http.put(url,payload,options).map((response: any) => {
			this.cryptos = <any>response.json();
			return this.cryptos;
		}).catch((error: any) => this.handleError(error));
	}
	public getSingle(model_id) : Observable<any> {
    let url = environment.apiUrl+"/crypto/"+model_id;
    let options = this.headersService.getWithAuth();
    console.log(model_id)
    return this.http.get(url,options) 
            .map((response: any) => {
             console.log(response.json());
              let document = response.json();
              let result = document.Data;
              return result;
            })
            .catch((error: any) => this.handleError(error));
  }
  public getUploadData(model_id) : Observable<any> {
    let url = environment.apiUrl+"/models/"+model_id;
    let options = this.headersService.getWithAuth();
    return this.http.get(url,options) 
            .map((response: any) => {
             console.log(response.json());
              let document = response.json();
              let result = document.Data;
              return result;
            })
            .catch((error: any) => this.handleError(error));
  }
  public getModelid(fileId) : Observable<any> {
  
    let url = environment.apiUrl+"/models/"+fileId;
    let options = this.headersService.getWithAuth();
    return this.http.post(url,{},options) 
            .map((response: any) => {
             console.log(response.json());
              let document = response.json();
             console.log(document.ModelId);
              
              let result = document.ModelId;
              return result;
            })
            .catch((error: any) => this.handleError(error));
  }
	private handleError(error: any): Observable<any> {
		console.log(error);
		var type_error  = error.status.toString()[0];
		this.error_message = type_error != 5 ? error._body : environment.msgErrors.server;
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
