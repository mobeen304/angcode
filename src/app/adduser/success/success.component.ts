import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

	addname() {
		this.router.navigate(['adduser/addname']);
	}
}
