import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  constructor(private fs: AngularFirestore, public auth: AngularFireAuth) { }

  loading: boolean = false;
  events;
  blackList = ["AutoCAD", "Poster Presentation", "Prabandha"];

  redirectTo = event => `./${event}`;
  
  fetchEvents = () => {
    this.loading = true;
    this.fs.collection("events").get().toPromise().then((res) => {
      this.events = res.docs.map((doc) =>doc.id);
      this.loading = false;
    })
  }

  ngOnInit() {
    this.fetchEvents();
    console.log(this.auth.auth.currentUser);
  }

}
