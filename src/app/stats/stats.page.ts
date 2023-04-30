import { Component, OnInit } from '@angular/core';
import { Chart} from 'chart.js';
import { projet, ProjetService } from '../login/projet.service';
import 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin);

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
     this.projets=projets
    this.rederchartbar(this.N,this.G,this.T,this.P)

    this.rederchartzeg(this.N,this.G,this.T,this.P)

    })
   
}

rederchartbar(N:number,G:number,T:number,P:number){
  const Total = N + G +P + T
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
        pointRadius: 5,
        pointHoverRadius: 10

      },]
    },
    options: {
    
      aspectRatio: -16,
      plugins:{
        legend: { 
          display: false
        }, 
         annotation: {
          annotations:  P >= 4 ? {
            label1: {
              type: 'label',
              xValue: 3,
              yValue: P,
              xAdjust: -150,
              yAdjust: -20,
              backgroundColor: 'rgba(245,245,245)',
              content: ["besoin d'attention ","les projets non terminés sont trop élevés"],
              textAlign: 'start',
              font: {
                size: 9
              },
              callout: {
                display: true,
                side: 15
              }
            }
          } : {}
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: Total,
        }
      }
    }
  });
}

rederchartzeg(N:number,G:number,T:number,P:number){
  const Total = N + G + T + P
  console.log(Total)
  N = N*100/Total
  G = G*100/Total
  T = T*100/Total
  P = P*100/Total
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
        },
        datalabels: {
          formatter: function(value, context) {
            return value.toFixed(2) + '%';
          },
          color: '#fff',
          borderRadius: 3,
          anchor: 'end',
          align: 'start'
        },
        annotation: {
          annotations: {
            label1: {
              type: 'label',
              xValue: 2.5,
              yValue: 60,
              backgroundColor: 'white',
              content: ['Total',Total.toString()],
              font: {
                size: 16,
              }
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              var label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed) {
                label += context.parsed.toFixed(2) + '%';
              }
              return label;
            }
          }
        }
        
      },
    }
  });
}
}
