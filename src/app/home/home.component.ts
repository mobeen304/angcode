import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';

import { environment } from '../../environments/environment';

import { ModelsService } from '../shared/services/models.service';
import { StocksService } from '../shared/services/stocks.service';
import { Model } from '../shared/models/model.model';


declare var $:any;

@Component({
	selector: 'app-home',
	templateUrl: 'home.component.html',
	styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	
	private _subscriptions: Subscription[] = [];

	models: Model[] = [];
	displayedColumns: string[] = ['Agent', 'CreatedAt', 'Data', 'Status', 'TrainingTime', 'Accuracy'];
	dataSource;
    selStockData: Object[]; 
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		public auth: AuthService,
		private route: ActivatedRoute,
		public router: Router,
		private modelsServie: ModelsService,
		private stockServie: StocksService,
		private messagesService: MessagesService,
		private notificationsService: NotificationsService
	) {

	}

	ngOnInit(): void {
		this.route.data.subscribe((data: { models: Model[] }) => {
			this.models = data.models;
			this.createTable();
		});
	}

	createTable() {
		this.dataSource = new MatTableDataSource(this.models);
		this.dataSource.sort = this.sort;
		// this.dataSource.paginator = this.paginator;
	}

	newAgent() {
	  this.goDatasource();
	}

	goDatasource() {
		this.router.navigate(['datasource']);
	}
    selectRow(data){
      this.selStockData = data;
      console.log(this.selStockData);
    }
	ngOnDestroy() {
		this._subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}
