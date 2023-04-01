import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private loadingController: LoadingController,private alertController:AlertController,private authservice:AuthService,private router:Router) { }
    
  async login(f:{email:any,password:any}){
    const loading = await this.loadingController.create();
    await loading.present();
    const user =await this.authservice.login(f)
    await loading.dismiss();
    
    if(user) {
      this.router.navigateByUrl('/dash',{replaceUrl:true})
    }else{
       this.showAlert('login faild ','please try again!')
    }
  }
  async showAlert(header:string,message:string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons:['ok'],
    })
    await alert.present();
  }

  ngOnInit() {
  }


  
}
