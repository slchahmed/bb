import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
export interface user{
  id?:string;
  ide?:string;
  nom:string;
  phone_number?:string;
  imgURL?:string;
  email:string;
  age?:number;
  authorisations:{
    ajouter_un_projet:boolean,
    modidier_un_projet:boolean,
    suprimer_un_projet:boolean,
    ajouter_un_utilisateur:boolean,
    modifier_un_utilisateur:boolean,
    suprimer_un_utilisateur:boolean,
    termination_des_taches:boolean,
    suprimer_des_taches:boolean,
    gestion_des_utilisateur:boolean,
  };
  password?:number;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private auth:Auth,private firestore:Firestore) { }

  async register(f:{email:any,password:any}) {
   
    try{
      const user = await createUserWithEmailAndPassword(this.auth,f.email,f.password)
      return user;
    }catch(e){
      return null;
    }

  }
  adduser(user:user){
    const projetsref = collection(this.firestore,'users');
    return addDoc(projetsref,user);
  }

  async login(f:{email:any,password:any}) {
    try{
      const user = await signInWithEmailAndPassword(this.auth,f.email,f.password)
      return user;
    }catch(e){
      return null;
    }
  }
  async uploadimg(imgupload:string){}

  logout() {
    return signOut(this.auth);
  }
}
