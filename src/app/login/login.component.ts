import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AngularFireAuth , private _Router:Router){}
  login() {
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    this._Router.navigate(['/users'])
  }
  logout() {
    this.auth.signOut();
    this._Router.navigate(['/'])
  }
  ngOnInit(): void {
  }

}
