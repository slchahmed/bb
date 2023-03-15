import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
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
  constructor(private auth:Auth,private active_router:ActivatedRoute,private service:ProjetService,private alertcontroller:AlertController,private firestore:Firestore) { }

  ngOnInit() {
    this.active_router.paramMap.subscribe(paramap=>{
     this.id= paramap.get('id') as string
    })
    this.service.getprojetById(this.id).subscribe(projet=>{
   
      if (projet['status'] == 'Not started') {
        projet['badgeColor'] = 'hsl(58,100%,54%)';
       
      }
       if ( projet['status'] == 'behind schedule') {
        
        projet['badgeColor'] = '#ff0404';
     
        

      } 
      if (projet['status'] =='In progress') {
        projet['badgeColor'] = '#FDA349';
    
        

      } 
       if(projet['status'] == 'Completed'){
        projet['badgeColor'] = '#55ad48';         

      }
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
}
