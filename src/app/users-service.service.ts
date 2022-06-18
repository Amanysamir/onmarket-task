import { user } from './user';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection ,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  itemsCollection!: AngularFirestoreCollection<user>;
  usersdata: Observable <any>
  itemdoc !: AngularFirestoreDocument <user>
  constructor(public afs:AngularFirestore) {
    /* this.usersdata = this.afs.collection('users').valueChanges(); */

    this.itemsCollection =this.afs.collection('users');
    this.usersdata = this.itemsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as user ;
          const id =a.payload.doc.id;
          return { id, ...data } ;
        })
      })
    )

    console.log(this.usersdata);


   }
   getusers(){
     return this.usersdata  ;
   }
   adduser (user :user){
     this.itemsCollection.add (user)
   }
   edituser(user:any ){
    this.itemdoc = this.afs.doc(`users/${user.id}`);
    this.itemdoc.update(user);
    console.log(user +'from service')
   }
   deleteuser(user:any){
        this.itemdoc = this.afs.doc(`users/${user.id}`);
        this.itemdoc.delete()
   }
}
