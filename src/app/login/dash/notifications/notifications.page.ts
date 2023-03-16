import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { projet, ProjetService } from '../../projet.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  user = this.auth.currentUser;
  important:projet[] =[];
  close:projet[]=[];
  
 constructor(private auth:Auth,private serviceprojects:ProjetService) {
  }

 ngOnInit() {
   
   this.serviceprojects.getprojets().subscribe(projets =>{
 
    
     for(let projet of projets){
        
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
          this.close.push(projet)
        }
         if (progress >= 1 && projet.status !== 'Completed') {
          projet.status = 'behind schedule';
          projet.badgeColor = '#ff0404';
    
       
          

        } 
        if (progress <= 0.6 && projet.status !=='Completed') {
          projet.status = 'In progress';
          projet.badgeColor = '#FDA349';
       
          

        } 
         if(projet.status == 'Completed'){
          projet.badgeColor = '#55ad48';
        
           

        }
        if (projet.status == 'behind schedule'){
         this.important.push(projet)
         console.log(this.important)

        }
       projet.date_debut = projet.date_debut.split(',')[0]; 
       projet.date_fin = projet.date_fin.split(',')[0]; 
    
        
     }
   })
 }

}
