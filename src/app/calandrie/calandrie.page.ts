import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calandrie',
  templateUrl: './calandrie.page.html',
  styleUrls: ['./calandrie.page.scss'],
})
export class CalandriePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  pick_date(value:string |string[]|null |undefined){
     this.router.navigate(['calandrie',value])
  }
}
