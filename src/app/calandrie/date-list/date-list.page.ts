import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { projet, ProjetService } from 'src/app/login/projet.service';

@Component({
  selector: 'app-date-list',
  templateUrl: './date-list.page.html',
  styleUrls: ['./date-list.page.scss'],
})
export class DateListPage implements OnInit {
  date!:string |null;
  projets:projet[] =[]
  constructor(private activerouter:ActivatedRoute  , private service:ProjetService) { }

  ngOnInit() {
    this.activerouter.paramMap.subscribe(paramap =>{
      this.date = paramap.get('date')

    })

    this.service.getprojets().subscribe(projets =>{
  
      
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
      
         const date_debut = new Date(projet.date_debut);
         const date_fin = new Date(projet.date_fin);

// Format the date in the ISO 8601 format
        projet.date_debut = date_debut.toISOString();
        projet.date_fin = date_fin.toISOString();
     
        projet.date_debut = projet.date_debut.split('T')[0]; 
        projet.date_fin = projet.date_fin.split('T')[0]; 
        this.date = this.date!.split('T')[0]
        if(projet.date_fin == this.date){
         this.projets.push(projet)
        }

       
      }
     
      
       
    
    })
  }
}

