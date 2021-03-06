import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';
import { MatSort, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

import { AuthService } from '../../shared/services/auth.service';
import { StocksService } from '../../shared/services/stocks.service';
import { MessagesService } from '../../shared/services/messages.service';

import { environment } from '../../../environments/environment';

import { Stock } from '../../shared/models/stock.model';

@Component({
	selector: 'app-stocks-list',
	templateUrl: 'stocks-list.component.html',
	styleUrls: ['stocks-list.component.scss']
})
export class StocksListComponent implements OnInit, OnDestroy {
	
	private _subscriptions: Subscription[] = [];

	stocks: Stock[];
	newStockRes : Object[];
	selStockData: Stock;
	displayedColumns: string[] = ['Stock', 'Symbol', 'LatestPrice', 'Popularity'];
	dataSource;

	@ViewChild(MatSort) sort: MatSort;

	constructor(
		public auth: AuthService,
		private stockService: StocksService,
		public router: Router,
		private route: ActivatedRoute,
		private messagesService: MessagesService,
		private notificationsService: NotificationsService
	) {

	}

	ngOnInit(): void {
		this.route.data.subscribe((data: { stocks: Stock[] }) => {
			this.stocks = data.stocks;
			this.selStockData = this.stocks[0];
			this.createTable();
		});
	}
	
	createStock() {
	console.log(this.selStockData);
		if (this.selStockData && this.selStockData['Stock']) {
			this.stockService.create(this.selStockData['Stock']).subscribe((new_model) => {
				localStorage.setItem('currentModel', JSON.stringify(new_model));
	            console.log(JSON.stringify(new_model)); 
				this.goStocksAgent(new_model.id);
			});
		} else {
			this.notificationsService.error(
				'Please select at least one stock',
				"&nbsp;",
				{
					timeOut: 2000,
					pauseOnHover: false,
					clickToClose: true,
				}
			);
		}
	}
	newView() {

		if (this.selStockData && this.selStockData['Stock']) {
			this.stockService.create(this.selStockData['Stock']).subscribe((new_model) => {
				localStorage.setItem('currentModels', JSON.stringify(new_model));

				this.goNewView();
			});
		} else {
			this.notificationsService.error(
				'Please select at least one stock',
				"&nbsp;",
				{
					timeOut: 2000,
					pauseOnHover: false,
					clickToClose: true,
				}
			);
		}
	}

	createTable() {
		this.dataSource = new MatTableDataSource(this.stocks);
		this.dataSource.sort = this.sort;
	}

	selStock(data: Stock) {
		// console.log(data);
		this.selStockData = data;
	}

	parseFloat(str: string) {
		return parseFloat(str);
	}

	goStocksAgent(id) {
	console.log(id);
		/*this.router.navigate(['stocks/agent']);*/
		this.router.navigate(['timeinterval','stock',id]);
	}
	goNewView() {
		this.router.navigate(['timeinterval']);
	}
	emailView() {
		this.router.navigate(['adduser']);
	}
	

	ngOnDestroy() {
		this._subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}
