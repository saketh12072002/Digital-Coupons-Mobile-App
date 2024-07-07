import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisersService {

  constructor(public auth: AngularFireAuth, private fs: AngularFirestore, public user: UserService) {


  }



}
