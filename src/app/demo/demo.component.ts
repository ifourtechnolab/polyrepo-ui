import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../shared/util.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements OnInit {

  constructor(public router: Router,private util:UtilService) { }

  ngOnInit() { }

  routeToLogin() {
      this.router.navigate(['auth/login']);
  }
  routeToRegistor() {
    this.router.navigate(['auth/register']);
  }
}
