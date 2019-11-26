import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StocksService } from '../../shared/services/stocks.service';
import { CryptosService } from '../../shared/services/cryptos.service';
import { NotificationsService } from 'angular2-notifications';
import { Stock } from '../../shared/models/stock.model';
import { DndDropEvent } from 'ngx-drag-drop';
import { DataSource } from '@angular/cdk/table';
@Component({
  selector: 'app-intraday',
  templateUrl: './intraday.component.html',
  styleUrls: ['./intraday.component.scss']
})
export class IntradayComponent implements OnInit {
    tbheadervl = [];
    isHidden: boolean = false;
    hideInfo: boolean = true;
    iscloseHidden: boolean = false;
    iscloseHidden_: boolean = false;
    istitleHidden: boolean = true;
    tbbadyvl = [];
    sData: any[] =[];
    storeData: Stock[] ;
    cData: any[] = [];
    dropData: Stock[] =[];
    sideColumn :any = {};
    dropClmnindex: string;
    doesdrop: boolean=false;
    //sideColumn: string[];
    displayedColumns: string[];
    dataSource;
    model_id: string;
    predict_clmn: string;
    type: string;
    viewType: string;
    model_type: string;
    payload = {};
    Open: Array < any > = [];
    tableData: Array < any > = [];
    doNEXT : boolean= true;
    column: Array < any > = [];
    reverseColumn: Array < any > = [];
    Dropcolumn: Array < any > = ['Open','High','volume','Low','time','Close','Volume','Timestamp'];
    allColumn: Array < any > = ["Timestamp", "Open", "High", "Low", "Volumn", "time","Close"];;
    public dropzoneEnabled:boolean = true;
    public lastDropEvent:DndDropEvent | null = null;
    public lastCloseDropEvent:DndDropEvent | null = null;
    constructor(public router: Router,
        private stockService: StocksService,
        private cryptoService: CryptosService,
        public route: ActivatedRoute,
        private notificationsService: NotificationsService,
    ) {

    }
    ngOnInit() {
      
      console.log('number')
      
        this.route.params.subscribe(params => {
            this.model_id = params['id'];
            this.model_type = params['model_type'];
            
           if(typeof params['type'] === 'undefined'){
              this.istitleHidden = false;
            }else{
            this.type = params['type'];
            if(params['type'] == 'Minute'){
              this.viewType = "Intraday Data";
            }else if(params['type'] == 'Hour'){
              this.viewType = "Hourly Data";
            }else if(params['type'] == 'Day'){
              this.viewType = "Daily Data";
            }
            }
        });

console.log(this.model_type);
console.log(localStorage.stockInfo);
console.log(typeof localStorage.currentModels);
        if (this.model_type!='excel' && localStorage.stockInfo != '') {
        console.log(localStorage.currentModels);
            this.sideColumn = JSON.parse(localStorage.currentModel);
        }
        console.log(this.sideColumn)
         // console.log(this.model_type);
        if (this.model_type == 'stock') {
            this.getStockSingle();
        }
        if (this.model_type == 'crypto') {
            this.getCryptoSingle();
        }
        if (this.model_type == 'excel') {
            this.getUploadData();
        }
    }
    updateModel() {
        console.log(this.model_type);
        if (this.model_type == 'stock') {
            this.UpdateStock();
        }
        if (this.model_type == 'crypto') {
            this.Updatecrypto();
        }
    }
    getStockSingle() {
        this.stockService.getSingle(this.model_id).subscribe((new_model) => {
        //console.log(new_model);
            var x = JSON.parse(new_model);
            var V = [];
            let Objres = Object.keys(JSON.parse(new_model));
             Objres.forEach(key => {
                  //   console.log(x[key]);
                    V.push(x[key]);
                     console.log(V);
                      console.log(this.sideColumn);
         });
        
            this.storeData = V;
        });

    }
       ucfirst(str,force){
          str=force ? str.toLowerCase() : str;
          return str.replace(/(\b)([a-zA-Z])/,
                   function(firstLetter){
                     // return   firstLetter.toUpperCase();
                      return   firstLetter.toUpperCase();
                   });
     }
    getUploadData() {
        this.cryptoService.getModelid(this.model_id).subscribe((model_id) => {
        console.log(model_id);
         this.cryptoService.getUploadData(model_id).subscribe((new_model) => {
        console.log(new_model);
            var x = JSON.parse(new_model);
            var V = [];
             console.log(x);
           // this.column = ["Timestamp", "Open", "High", "Low", "Volumn", ];
            let Objres = Object.keys(JSON.parse(new_model));
             Objres.forEach(key => {
                     console.log(x[key]);
                     console.log(key);
                    V.push(x[key]);
                    V.push(x[key]);
                     //console.log(V);
         });
          //  console.log(this.column);

           this.allColumn = Object.keys(V[0]);
           this.Dropcolumn = Object.keys(V[0]);
           //this.column = Object.keys(V[0]);
           var F = Object.keys(V[0]);
           console.log(F);

           this.sideColumn['variables'] = [];
           F.forEach(key=>{
           console.log(key);

           this.sideColumn['variables'].push({'name':key});
           })
           console.log(this.allColumn);
           console.log(this.sideColumn);
            this.storeData = V;
            this.isHidden = true
           console.log(this.storeData);

        });

        });

    }
    getCryptoSingle() {
        this.cryptoService.getSingle(this.model_id).subscribe((new_model) => {
       // console.log(new_model);
            var x = JSON.parse(new_model);
            var V = [];
           // this.column = ["Timestamp", "Open", "High", "Low", "Volumn", ];
            let Objres = Object.keys(JSON.parse(new_model));
             Objres.forEach(key => {
                     console.log(x[key]);
                    V.push(x[key]);
                     //console.log(V);
         });
          //  console.log(this.column);
            this.storeData = V;
            this.isHidden = true
           //console.log(this.sData);

        });

    }
    objectKeys(obj) {
    //console.log(obj);
    if(typeof obj!=='undefined'){
    return Object.keys(obj);
    }
}
    UpdateStock() {
        this.payload = {
            'OutputVariable': 'Close',
            'TimeInterval': this.type
        };
     //   console.log( this.payload)
        this.stockService.updateStock(this.payload, this.model_id).subscribe((new_model) => {
            //this.router.navigate(['timeinterval/intraday']);
            console.log(JSON.stringify(new_model));
            this.notificationsService.success(
                '&nbsp;',
                new_model.Message, {
                    timeOut: 3000,
                    pauseOnHover: false,
                    clickToClose: false,
                }
            );
        });

    }
    Updatecrypto() {
        this.payload = {
            'OutputVariable': 'Close',
            'TimeInterval': this.type,
            'TimeVariable': 'time'
        };

        this.cryptoService.updateCryptos(this.payload, this.model_id).subscribe((new_model) => {
            //this.router.navigate(['timeinterval/intraday']);
          //  console.log(new_model);
           // console.log(JSON.stringify(new_model));
            this.notificationsService.success(
                '&nbsp;',
                new_model.Message, {
                    timeOut: 3000,
                    pauseOnHover: false,
                    clickToClose: false,
                }
            );

        });
    }
    TrainingView() {
        this.updateModel();
        this.router.navigate(['training', this.model_id]);
    }
    showclosed() {
        this.isHidden = true;
      //  console.log(this.isHidden);
    }
    onDragStart(event:DragEvent){
      this.doesdrop = false;
   console.log(event);

    }
    onDragEnd( event:DragEvent,j ) {

   console.log(event);
   console.log(j);
   this.dropClmnindex = j;
   if(this.doesdrop){
    
   }
  }

  onDrop( event:DndDropEvent ) {
    this.lastDropEvent = event;
    console.log(event);
    var clmn = (event.data!='time')?event.data:'time';
  //  var clmn = (event.data!='time')?this.ucfirst(event.data,true):'time';
    var clmns = (event.data!='time')?event.data:'Timestamp';
    var r = [];
    console.log(clmns)
    console.log(this.column)
    console.log(this.predict_clmn)
    console.log(this.predict_clmn!=clmns)
    console.log(this.column.indexOf(clmns) === -1)
     this.doesdrop = true
     this.hideInfo = false
    this.isHidden = true;
       this.iscloseHidden_ = true;
   //console.log(this.sideColumn.variables)
    if (this.column.indexOf(clmns) === -1 && this.predict_clmn!=clmns) {
        this.column.push(clmns);
         console.log(this.column)
         console.log(this.storeData)
    this.storeData.forEach(key => { 
    localStorage.__extravall = JSON.stringify(key);
    console.log(clmn)
   
                     r.push(key[clmn]);
         });
         this.sData.push(r);  
         this.removeValue(clmns);
    }     
                 console.log(this.storeData);
                 console.log(clmn);
                
  }

  removeValue(name){
        
       console.log(name);
              console.log(this.sideColumn.variables);

     name = (name!='Timestamp')?name:'time';
      

        this.sideColumn.variables.forEach((item, index) => {
              if(item.name==name){
              console.log(index);
               console.log(this.sideColumn.variables[index])
              console.log(item);
              this.sideColumn.variables.splice(index, 1 ); 
              }
             
       });
         this.reverseColumn.forEach((item, index) => {
              if(item.name==name){
              console.log(index);
              console.log(item);
              this.sideColumn.reverseColumn.splice(index, 1 ); 
              }
              });
  }
  onCloseDrop( event:DndDropEvent){
     var r = [];
     this.doNEXT = false;
     this.lastCloseDropEvent = event;
      var clmn = (this.lastCloseDropEvent.data!='time')?this.ucfirst(this.lastCloseDropEvent.data,true):'time';
    var clmns = (this.lastCloseDropEvent.data!='time')?this.ucfirst(this.lastCloseDropEvent.data,true):'Timestamp';
    console.log('close')
    console.log(this.column)
   
     this.storeData.forEach(key => {
                     r.push(key[clmn]);
         });
         console.log(r);
      if (!this.iscloseHidden) {
        if(this.cData.length==0){
      // this.sideColumn.variables.splice( this.dropClmnindex, 1 );  
       //this.column.push(clmns);
       this.cData.push(r)  ; 
       this.removeValue(clmns);
       } 
      this.iscloseHidden = true;
       this.predict_clmn = clmn;
       }
       console.log(this.cData);   
  }
   onDragged( item:any, list:any[] ) {
    
    const index = list.indexOf( item );
    list.splice( index, 1 );
  }
  IsNumber(val){
  return !isNaN(val)
  }
  checkrevrsColumn(clmn){
       
  }
  onReverseDrop( event:DndDropEvent ){
    console.log(event);
     var clmn = event.data;
     var clmns = (event.data!='time')?event.data:'Timestamp';
      
    var r = [];
    console.log(clmns)
    console.log(this.sideColumn.variables)
   //console.log(this.sideColumn.variables)
    if(this.reverseColumn.indexOf(clmns) === -1 && !this.sideColumn.variables.some((item) => item.name == clmn)) {
        this.reverseColumn.push(clmns);
        this.sideColumn.variables.push({'name':clmns});
         
        console.log(this.column)
        this.column.forEach((item,key) => { 
        console.log(item)
        console.log(key)
   if(item==clmn){
       this.column.splice(key, 1 );  
       this.sData.splice(key, 1 );          
   }
    });
    if(this.predict_clmn==clmns){
    this.cData.splice(0, 1 );  
    this.predict_clmn = '';
    this.iscloseHidden = false;
    }
    }
  }
}