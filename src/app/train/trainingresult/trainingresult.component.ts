import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainsService } from '../../shared/services/train.service';
 
import { Stock } from '../../shared/models/stock.model';

 //declare var Chart:any;
@Component({
  selector: 'app-trainingresult',
  templateUrl: './trainingresult.component.html',
  styleUrls: ['./trainingresult.component.scss']
})
export class TrainingresultComponent implements OnInit {
    model_id: string;
    sData: Stock[] = [];
    result: any[] = [];
    testClnm:any[] = [];
    barHeight = {};
    legend = {};
    barBottom = {};
    donutChartData:any[] = [];
    per = '';
    objectKeys = Object.keys;
    testVal:Stock[] = [];
    constructor(public router: Router,
        public route: ActivatedRoute,
        private trainService: TrainsService, 

        ) {}

    ngOnInit() {
    
        this.route.params.subscribe(params => {
            this.model_id = params['id'];
        });

        this.getResult();
    }
    canceltrain() {
        this.trainService.cancelTraining(this.model_id).subscribe((result) => {
            console.log(result);

            /*    this.notificationsService.success(
      '&nbsp;',
      result.Message,
      {
        timeOut: 3000,
        pauseOnHover: false,
        clickToClose: false,
      }
    );*/
            // this.router.navigate(['training/trainingresult',this.model_id]);
        });
    }
    getPredict() {
        this.trainService.predict(this.model_id).subscribe((result) => {
            console.log(result);
            if(typeof result.Error==='undefined'){
            var x = JSON.parse(result);
            var V = [];
             let Objres = Object.keys(x);
             Objres = Object.values(x);
             Objres.forEach(key => {
                     console.log(key);
                    V.push(Object.values(key)[0]);
         });
             this.sData = V;     
            
            console.log(V);
            }
        });
    }
    getResult() {
 
   
        this.trainService.trainResult(this.model_id).subscribe((result) => {
            console.log(result);
            this.result = result;
            this.per = result.PercentageComplete+' %';
            this.barHeight = {
              'height': 3.84*result.PercentageComplete+'px',
              };
              this.legend={
                display: false,         
              };
              this.barBottom = {
              'bottom': result.PercentageComplete+4+'px',
              };
this.donutChartData = [{
    id: 0,
    label: '',
    value: result.PercentageComplete,
    color: '#00cc99',
  }, {
    id: 1,
    label: '',
    value: 100-result.PercentageComplete,
    color: '#eee',
  } ];
            if(result.TestOutput!=null && typeof result.TestOutput.Error=='undefined'){
            var x = JSON.parse(result.TestOutput)
            this.testClnm = Object.keys(x);
            this.testVal = x;
            }          
      setTimeout(function() {
         var elem = document.getElementsByClassName('legend')[0];
      elem.remove();
      var x = document.getElementsByTagName("text")[0];
var y = x.innerHTML;
if(y.length < 3){
  var u = y.substr(0,2);
}else{
var u = y.substr(0,3);
}
x.textContent=u;
  var parent = document.getElementsByTagName("text")[0];
  var newChild = '<text x="22" y="2" font-size="1em" style="fill: rgb(255, 255, 255);">%</text>';
  parent.insertAdjacentHTML('afterend', newChild);
       },  100);
            console.log(x);
            console.log(this.testClnm);
            console.log(this.testVal);

           /* if(typeof result.Message==='undefined'){
            var x = JSON.parse(result);
            var V = [];
             let Objres = Object.keys(x);
             Objres = Object.values(x);
             Objres.forEach(key => {
                     console.log(key);
                    V.push(Object.values(key)[0]);
         });
             this.sData = V;     
           
            console.log(V);
            }*/
        });
    }

}