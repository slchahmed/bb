import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
export interface user{
  nom:string;
  phone_number:string;
  photoURL?:string;
  email:string;
  age:number;
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
