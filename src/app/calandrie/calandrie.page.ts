import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetService, projet } from '../login/projet.service';

@Component({
  selector: 'app-calandrie',
  templateUrl: './calandrie.page.html',
  styleUrls: ['./calandrie.page.scss'],
})
export class CalandriePage implements OnInit {
  date_fin!:string
  date_fins!:string[]
  date_fins_temp:string[] = []
  projets:projet[] = []
  search_result!:projet[]
  constructor(private router:Router,private serviceprojects:ProjetService) { }

  ngOnInit() {
    this.serviceprojects.getprojets().subscribe(projets =>{
    
      // this.T=0
      // this.G=0
      // this.F=0
      // this.P=0
      // this.passe_delai = 0
       for(let projet of projets){
         
        
      //     this.T=this.T+1
      //     projet.date_debut= new Date(projet.date_debut).getTime();
      //     projet.date_fin = new Date(projet.date_fin).getTime();
      //     const currentDate = new Date();
      //     const totalTime = projet.date_fin - projet.date_debut;
      //     const elapsed = currentDate.getTime() - projet.date_debut;
  
      //     const date_d = new Date(projet.date_debut);
      //     const dateString_d = date_d.toLocaleString()
      //     projet.date_debut = dateString_d
  
      //     const date_f = new Date(projet.date_fin);
      //     const dateString_f = date_f.toLocaleString()
      //     projet.date_fin = dateString_f
  
      //     const progress = elapsed / totalTime;
  
        
      //     if ( progress<0 && projet.status == 'Not started') {
            
      //       projet.badgeColor = 'primary';
           
      //     }
      //      if (progress >= 1 && projet.status !== 'Completed') {
      //       projet.status = 'behind schedule';
      //       projet.badgeColor = '#ff0404';
      //       this.P=this.P+1
         
            
  
      //     } 
      //     if (progress <= 1 && progress > 0 && projet.status !=='Completed') {
      //       projet.status = 'In progress';
      //       projet.badgeColor = '#FDA349';
      //       this.G=this.G+1
            
  
      //     } 
      //      if(projet.status == 'Completed'){
      //        projet.status = 'Completed';
      //        projet.badgeColor = '#3BAE74';
      //        this.F=this.F+1
             
  
      //     }
      //      if(projet.status !== 'Completed'){
            
             
    
             
  
      //     }
          if (projet.status == 'Behind schedule'){
                  console.log(projet)
                  this.date_fin=this.formatdate(projet.date_fin).split('T')[0];
                   this.date_fins_temp.push(this.date_fin)
                   this.projets.push(projet)
           
          }
      
        //  projet.date_debut = projet.date_debut.split(',')[0]; 
        //  projet.date_fin = projet.date_fin.split(',')[0]; 
      
          
       }
       this.date_fins = this.date_fins_temp
       this.search_result = this.projets
       console.log(this.date_fins)
      //  this.projets=projets;
      //  this.search_result=this.projets.slice()
     
     })
  }
  
  pick_date(value:string |string[]|null |undefined){
     this.router.navigate(['calandrie',value])
  }
  formatdate(date:string){
    
    const parts = date.split('/');
    const year = parseInt(parts[2]);
    const month = parseInt(parts[0]) < 10 ? `0${parts[0]}` : parts[0];
    const day = parseInt(parts[1]) < 10 ? `0${parts[1]}` : parts[1];
    const isoDate = new Date(`${year}-${month}-${day}`).toISOString();
    return isoDate
  }
  handleChange(value:string){
    const query = value.toLowerCase();
    this.search_result = this.projets.filter(d => d.Titre.toLowerCase().indexOf(query) > -1);
   
     }
}
