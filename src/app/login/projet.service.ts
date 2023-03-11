import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
export interface projet{
  id?:string;
  Titre:string;
  sujet:string;
  chef?:string;
  date_debut:any | string;
  date_fin:any | string;
  equipe:string[];
  status?:string;
  badgeColor?:string;
  Equipe?:string;
  Tache?:string;
  taches?:string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private firestore:Firestore , private auth:Auth) { }

  getprojets(): Observable<projet[]> {
    const userId = this.auth.currentUser?.uid;
    const projetsRef = collection(this.firestore, 'projets');
    const q = query(projetsRef, where("chef", "==", userId));
    return collectionData(q, { idField: 'id' })as unknown as Observable<projet[]>
  }

  getprojetById(id:string){
    const projetref = doc(this.firestore,`projets/${id}`);
    return docData(projetref,{idField:'id'})
  }
}
