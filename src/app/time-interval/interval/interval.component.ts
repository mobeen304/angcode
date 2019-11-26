import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StocksService } from '../../shared/services/stocks.service';
import { CryptosService } from '../../shared/services/cryptos.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.scss']
})
export class IntervalComponent implements OnInit {
    selectedType:string;
    myParam :string;
    type:string;
    payload = {};
 	constructor(
		public router: Router,
		public route: ActivatedRoute,
		private stockService: StocksService,
		private cryptoService: CryptosService,
		private notificationsService: NotificationsService
	) {

	}

  ngOnInit() {
   this.route.params.subscribe(params=>{
   this.myParam = params['id'];
   this.type=params['type'];
   });
   console.log(this.myParam);
   console.log(this.type);

  }
  
  intradayView(type) {
          this.selectedType = type;
          console.log(this.myParam);
          if(this.type=='stock'){
          this.stockNextView('stock',type,this.myParam);
          }
          if(this.type=='crypto'){
          this.cryptoNextView('crypto',type,this.myParam);
          } 
	}
  stockNextView(modeltype,type,id) {
		this.router.navigate(['timeinterval/intraday',modeltype,type,id]);
	}
  cryptoNextView(modeltype,type,id) {
		this.router.navigate(['timeinterval/intraday',modeltype,type,id]);
	}
}
