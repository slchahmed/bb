import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authservice:AuthService,private router:Router) {}

  async logout(){
   await this.authservice.logout()
  this.router.navigateByUrl('/',{replaceUrl:true});
  }
}
