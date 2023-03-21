import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType ,Chart} from 'chart.js';
import { projet, ProjetService } from '../login/projet.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  P:number  =0
  T:number  =0
  G:number  =0
  N:number  =0
  projets!:projet[]
  constructor(private serviceprojects:ProjetService) { }
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
       
          
          if (projet.status == 'Not started') {
            
            this.N = this.N+1
          
          }
          
           if(projet.status == 'Completed'){
               this.T=this.T+1
             
  
          }
          if (projet.status == 'In progress'){
            this.G = this.G+1
          }
          if (projet.status == 'Behind schedule'){
            this.P = this.P+1
          }
      
  
     }
      console.log(this.N)
      console.log(this.G)
      console.log(this.T)
      console.log(this.P)
     this.projets=projets
    this.rederchartbar(this.N,this.G,this.T,this.P)

    this.rederchartzeg(this.N,this.G,this.T,this.P)

    })
   
}

rederchartbar(N:number,G:number,T:number,P:number){
 
  const chart = new Chart('charbar', {
    type: 'line',
    data: {
      labels: ['pas commencé', 'En cours', 'Complété', 'passer la date'],
      datasets: [{
        label: 'status',
        data: [N, G, T, P],
        borderWidth: 2,
        borderColor:[
          '#3661EC',
          '#FDA349',
          '#55ad48',
          '#ff0404'
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointBackgroundColor:[
          '#3661EC',
          '#FDA349',
          '#55ad48',
          '#ff0404'
        ],
        pointBorderColor: '#fff',
        pointRadius: 10,
        pointHoverRadius: 17

      },]
    },
    options: {
   
      aspectRatio: -16,
      plugins:{
        
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

rederchartzeg(N:number,G:number,T:number,P:number){

  const chart = new Chart('charzeg', {
    type: 'doughnut',
    data: {
      labels: ['pas commencé', 'En cours', 'Complété', 'passer la date'],
      datasets: [{
        label: '# of Votes',
        data: [N, G, T, P],
        borderWidth: 1,
        backgroundColor: [
          '#3661EC',
          '#FDA349',
          '#55ad48',
          '#ff0404'
        ]

      }]
    },
    options: {
      aspectRatio: -16,
      plugins:{
       legend: {
          position: 'right'
        }
        
      },
    }
  });
}

}
