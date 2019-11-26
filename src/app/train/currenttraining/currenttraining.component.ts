import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainsService } from '../../shared/services/train.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-currenttraining',
  templateUrl: './currenttraining.component.html',
  styleUrls: ['./currenttraining.component.scss']
})
export class CurrenttrainingComponent implements OnInit {
   model_id: string;
 constructor(
		 
		public router: Router,
		  public route: ActivatedRoute,
       private trainService:TrainsService,
       private notificationsService: NotificationsService		
	) {}
 ngOnInit() {
 this.route.params.subscribe(params => {
             this.model_id = params['id'];
        });
                    console.log(this.model_id);
                    this.getData();
  }
   getData() { 
     this.trainService.trainResult(this.model_id).subscribe((result)=>{
            console.log(result);
      });
    //this.router.navigate(['training/currenttraining']);
  }
 trainingTest() {
		this.router.navigate(['training/trainingresult']);
	}
}
