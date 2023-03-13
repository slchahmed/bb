import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AlertController } from '@ionic/angular';
import { projet, ProjetService } from '../projet.service'
@Component({
  selector: 'app-dash',
  templateUrl: './dash.page.html',
  styleUrls: ['./dash.page.scss'],
})
export class DashPage implements OnInit {
  user = this.auth.currentUser;
  projets!:projet[];
  search_result!:projet[];
  columns = [{ prop: 'Title' }, { name: 'date_debut' }, { name: 'date_fin' },{ name: 'status' }];
  T!:number
  G!:number
  F!:number   
  P!:number   
  date_impo:string[] =[];
  
 constructor(private auth:Auth,private serviceprojects:ProjetService,private alertController:AlertController,private router:Router) {
  }

  async ngOnInit() {
   
   this.serviceprojects.getprojets().subscribe(projets =>{
   
    this.T=0
    this.G=0
    this.F=0
    this.P=0
    
     for(let projet of projets){
        
        this.T=this.T+1
        projet.date_debut= new Date(projet.date_debut).getTime();
        projet.date_fin = new Date(projet.date_fin).getTime();
        const currentDate = new Date();
        const totalTime = projet.date_fin - projet.date_debut;
        const elapsed = currentDate.getTime() - projet.date_debut;

        const date_d = new Date(projet.date_debut);
        const dateString_d = date_d.toLocaleString()
        projet.date_debut = dateString_d

        const date_f = new Date(projet.date_fin);
        const dateString_f = date_f.toLocaleString()
        projet.date_fin = dateString_f

        const progress = elapsed / totalTime;

        if (elapsed <= 0) {
          projet.status = 'Not started';
          projet.badgeColor = 'hsl(58,100%,54%)';
         
        }
         if (progress >= 1 && projet.status !== 'Completed') {
          projet.status = 'behind schedule';
          projet.badgeColor = '#ff0404';
          this.P=this.P+1
          

        } 
        if (progress <= 0.6 && projet.status !=='Completed') {
          projet.status = 'In progress';
          projet.badgeColor = '#FDA349';
          this.G=this.G+1
          

        } 
         if(projet.status == 'Completed'){
          projet.badgeColor = '#55ad48';
          this.F=this.F+1
           

        }
        const date_debut_temp = new Date(projet.date_debut);
        const date_fin_temp = new Date(projet.date_fin);
        
        projet.date_debut = date_debut_temp.toISOString();
        projet.date_fin = date_fin_temp.toISOString();
        projet.date_debut = projet.date_debut.split('.')[0]; 
        projet.date_fin = projet.date_fin.split('.')[0]; 
        this.date_impo.push(projet.date_fin)
        projet.date_debut = projet.date_debut.split('T')[0]; 
        projet.date_fin = projet.date_fin.split('T')[0]; 
      
     }
     this.projets=projets;
     this.search_result=this.projets.slice()
   })


     await  LocalNotifications.requestPermissions();


 }
 ionViewDidleave(){
   this.T=0
  
 }

 async sendNotification(){
  await LocalNotifications.schedule({
    notifications:[
      {
        title:"important",
        body:'project have passed the date',
        id:1
      }
    ]
  })
 }

handleChange(value:string){
 const query = value.toLowerCase();
 this.search_result = this.projets.filter(d => d.Titre.toLowerCase().indexOf(query) > -1);

  }
  async showAlert() {
    const alert = await this.alertController.create({
      header:'la modification des recordes necessite un visite de site web ! ',
      subHeader: 'Etes-vous d`daccord?',
      buttons:[{
        text:'ok',
        role:'confirm',
        handler:()=>{
          this.router.navigate(['dashboard'])
        } 
      },
      {
        text:'annuler',
        role:'cancel'
      }
    ],
    })
    await alert.present();
  }
  
}
