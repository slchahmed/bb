import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, doc, query, where ,updateDoc, deleteDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProjetService, projet } from '../login/projet.service';
import { user } from '../login/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  user!:user | null 
  projets!:projet[]
  
  T:number =0
  G:number =0
  F:number =0
  P:number =0
    constructor(private alertcontroller:AlertController,private activerouter:ActivatedRoute,private auth:Auth,private firestore:Firestore,private storage:Storage,private loading:LoadingController,private serviceprojects:ProjetService,private routerin:Router) {}
  
    ngOnInit() {
      this.activerouter.paramMap.subscribe(paramar =>{
       const email =  paramar.get('email') as string
      //  console.log(email)
        this.getuser(email).subscribe(user=>{
          this.user = user[0] as user
          // console.log(this.user)
          this.getprojets(this.user.ide!).subscribe(projets =>{
            this.T=0
            this.G=0
            this.F=0
            this.P=0
             for(let projet of projets){       
                this.T=this.T+1
                 if ( projet.status == 'Behind schedule') { 
                  this.P=this.P+1 
                } 
                if ( projet.status =='In progress') {
                  this.G=this.G+1
                } 
                 if(projet.status == 'Completed'){
                   this.F=this.F+1
                }    
             }
           })
        })
      })
     
    }
    getuser(email:string): Observable<user[]> {
      // const usermail = this.auth.currentUser?.email;
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where("email", "==", email));
      return collectionData(q, { idField: 'id' })as unknown as Observable<user[]>
    }
  
   async uploadPhoto(photo:Photo){
      const path = `uploads/${this.user?.ide}/profile.png`
      const storageref = ref(this.storage, path);
  
      await uploadString(storageref,photo.base64String!,'base64')
  
      const imgUrl = await getDownloadURL(storageref)
      this.user!.imgURL = imgUrl
      this.updateuser(this.user)
    }
  
    updateuser(user:user|null){
      const userref = doc(this.firestore,`users/${this.user?.id}`);
      return updateDoc(userref,{nom:user?.nom,phone_number:user?.phone_number,imgURL:user?.imgURL,authorisations:{ajouter_un_projet:user?.authorisations.ajouter_un_projet,modidier_un_projet:user?.authorisations.modidier_un_projet, suprimer_un_projet:user?.authorisations.suprimer_un_projet, ajouter_un_utilisateur:user?.authorisations.ajouter_un_utilisateur, modifier_un_utilisateur:user?.authorisations.modifier_un_utilisateur, suprimer_un_utilisateur:user?.authorisations.suprimer_un_utilisateur, termination_des_taches:user?.authorisations.termination_des_taches, suprimer_des_taches:user?.authorisations.suprimer_des_taches}})
    }
    async change_photo(){
      const img = await Camera.getPhoto({
        quality:90,
        allowEditing:false,
        resultType:CameraResultType.Base64,
      })
     
      if(img){
          const loading = await this.loading.create()
          await loading.present()
  
          const resulatat = this.uploadPhoto(img)
          loading.dismiss()
      }
    }
  
    getprojets(userId:string): Observable<projet[]> {
      const projetsRef = collection(this.firestore, 'projets');
      const q = query(projetsRef, where("chef", "==", userId));
      return collectionData(q, { idField: 'id' })as unknown as Observable<projet[]>
    }
   async deleteacount(){
      const alert = await this.alertcontroller.create({
        id: '1',
        header:'improtant ! ',
        subHeader: 'ce compte sera supprimé',
        buttons:[{
          text:'ok',
          role:'confirm',
          handler:()=>{
            this.deleteuser(this.user!)
            .then(() => {
              return this.auth.currentUser?.delete();
            })
            .then(() => {
              this.routerin.navigateByUrl('login');
              window.location.reload();
            })
            .catch((error) => {
              console.error(error);
            });
          } 
        },
        {
          text:'annuler',
          role:'cancel',
        }
      ],
      })
     
      await alert.present();
    
    }
    deleteuser(user:user){
      const userref = doc(this.firestore,`users/${user.id}`);
      return deleteDoc(userref);
    }

}
