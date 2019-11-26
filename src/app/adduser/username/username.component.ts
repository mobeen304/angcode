import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddUserService } from '../../shared/services/adduser.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  constructor(public router: Router,
              private adduserService: AddUserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
   this.userForm = this.formBuilder.group({
           
            email: ['', [Validators.required, Validators.email]],
           
        });
  }
  get f() { return this.userForm.controls; }
 next() {
 this.submitted = true;
 if (this.userForm.invalid) {
            return;
        }
        console.log(this.userForm.value);
 this.adduserService.adduser({'Username':this.userForm.value.email}).subscribe(result=>{
   console.log(result);
 });
		this.router.navigate(['adduser/useradded']);
	}
}
