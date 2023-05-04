import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { user } from '../../auth.service';
import { projet, ProjetService } from '../../projet.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  projet!:projet | null
  id!:string
  user!:user[] 
  chef!:user
  subbadgeColor!:string;
  status!:string
  constructor(private auth:Auth,private active_router:ActivatedRoute,private service:ProjetService,private alertcontroller:AlertController,private firestore:Firestore) { }

  ngOnInit() {
    this.active_router.paramMap.subscribe(paramap=>{
     this.id= paramap.get('id') as string
    })
    this.service.getprojetById(this.id).subscribe(projet=>{
      projet['date_debut']= new Date(projet['date_debut']).getTime();
      projet['date_fin'] = new Date(projet['date_fin']).getTime();
      const currentDate = new Date();
      const totalTime = projet['date_fin'] - projet['date_debut'];
      const elapsed = currentDate.getTime() - projet['date_debut'];

      const date_d = new Date(projet['date_debut']);
      const dateString_d = date_d.toLocaleString()
      projet['date_debut'] = dateString_d

      const date_f = new Date(projet['date_fin']);
      const dateString_f = date_f.toLocaleString()
      projet['date_fin'] = dateString_f

      const progress = elapsed / totalTime;

      if (progress <= 0) {
        
        projet['badgeColor'] = 'primary';
       
      }
       else if (progress >= 1 && projet['status'] !== 'Completed') {
 
        this.subbadgeColor = '#FFC1C9'
        projet['badgeColor'] = '#ff0404';
        this.status = 'dépassé le délai'
        
        

      } 
      else if (progress <= 1 && progress > 0 && projet['status'] !=='Completed') {
        
        projet['badgeColor'] = '#FDA349';
        this.subbadgeColor = '#ffe0c0'
        this.status = 'en cours'
        

      } 
       else if(projet['status'] == 'Completed'){
        projet['badgeColor'] = '#3BAE74';         
        this.subbadgeColor = '#d5f3db'
        this.status = 'Complété'

      }

    

    
    
      projet['date_debut'] = projet['date_debut'].split(',')[0]; 
      projet['date_fin'] = projet['date_fin'].split(',')[0]; 
      
      // this.updateprojet(projet as projet)
    
    
        
  
      this.getuser().subscribe(user=>{
        this.user = user
      
        this.chef = this.user[0]
      
        projet['chef'] = this.chef?.nom
        this.projet = projet as projet;
      })
   
      
        
     
    })
    
  }
  getuser(): Observable<user[]> {
    const usermail = this.auth.currentUser?.email;
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where("email", "==", usermail));
    return collectionData(q, { idField: 'id' })as unknown as Observable<user[]>
  }

  updateprojet(projet:projet|null){
    const projetref = doc(this.firestore,`projets/${projet?.id}`);
    return updateDoc(projetref,{Titre:projet?.Titre,sujet:projet?.sujet,chef:projet?.chef,date_debut:projet?.date_debut,date_fin:projet?.date_fin,equipe:projet?.equipe,status:projet?.status,taches:projet?.taches})
  }
}
