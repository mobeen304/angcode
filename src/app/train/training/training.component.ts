import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainsService } from '../../shared/services/train.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  title = 'app';
  myParam :string;
  model_id: string;
  labels: string[] = ['Column1', 'Column2', 'Column3'];
  data: number[] = [12, 142, 163];
  constructor(
       public router: Router,
       public route: ActivatedRoute,
       private trainService:TrainsService,
       private notificationsService: NotificationsService,
       ) { }

  ngOnInit() {
   this.route.params.subscribe(params=>{
                    this.model_id = params['id'];
                    });
                    console.log( this.model_id)
  }
   Train() {
     this.trainService.train(this.model_id).subscribe((result)=>{
            console.log(result);
               this.notificationsService.success(
      '&nbsp;',
      result.Message,
      {
        timeOut: 3000,
        pauseOnHover: false,
        clickToClose: false,
      }
    );
    this.router.navigate(['training/trainingresult',this.model_id]);

      });
    //this.router.navigate(['training/currenttraining']);
  }
   
}
