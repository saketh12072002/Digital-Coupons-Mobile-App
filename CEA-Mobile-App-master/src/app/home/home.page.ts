import { Component} from '@angular/core';
// import { OrganisersService } from '../organisers.service';
import { UserService } from '../user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  constructor(private user:UserService,private fs:AngularFirestore,private router:Router) {
    
console.log(this.router.url)
  }

 
}
