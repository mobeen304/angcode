import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addname',
  templateUrl: './addname.component.html',
  styleUrls: ['./addname.component.scss']
})
export class AddnameComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
next() {
		this.router.navigate(['adduser/invite']);
	}
}
