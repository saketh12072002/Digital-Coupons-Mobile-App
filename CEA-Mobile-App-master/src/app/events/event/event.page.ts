import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  loading = false;

  constructor(private route: ActivatedRoute, private fs: AngularFirestore) { }

  event = this.route.snapshot.paramMap.get("event");
  eventDetails;
  fetchEvent = (event) => {
    this.loading = true;
    this.fs.collection("events").doc(event).get().toPromise().then(res => {
      this.eventDetails = res.data();
      this.loading = false;
      console.log(this.eventDetails);
    });
  }

  ngOnInit() {
    this.fetchEvent(this.event);  
  }

}
