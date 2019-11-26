import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {
   isHidden: boolean = false;
   firstemail: string;
   scndemail: string;
   thrdemail: string;
  constructor(public router: Router) { }

  ngOnInit() {
  }
addCard() {
		this.router.navigate(['adduser/add-card']);
	}
offer() {
	 
		if(typeof this.firstemail!=='undefined' && this.firstemail!=''){
		this.isHidden = true;
		}else{
		this.isHidden = false;
		}
	}
}
