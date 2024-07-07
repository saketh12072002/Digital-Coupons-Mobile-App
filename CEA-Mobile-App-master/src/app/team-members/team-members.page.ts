import { Component, OnInit, Input } from '@angular/core';
// import { OrganisersService } from '../organisers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.page.html',
  styleUrls: ['./team-members.page.scss'],
})

export class TeamMembersPage implements OnInit {

  loading = false;
  depts = {
    fr: 'Facilities & Requirements',
    events: 'Events',
    webops: 'Web Operations',
    mad: 'Design & Creatives',
    nirmaan: 'Nirmaan',
    finance: 'Finance',
    spons: 'Spons',
    dsr: 'Department & Student Relations'
  }

  constructor(

    private route: ActivatedRoute, 
    public user: UserService, 
    private router: Router,
    private fs: AngularFirestore
    ) { }

  dept = this.route.snapshot.paramMap.get('dept');

  teamList;
  cores;
  coords;
  depCoprds;

  fetchDepartment = () => {
    this.loading = true;
    this.fs.collection('users').ref.where('dept', '==', `${this.dept}`).get().then(res => {
      this.teamList = res.docs.map(doc => doc.data());
      this.cores = this.teamList.filter(doc => (doc.role == 'core'));
      this.coords = this.teamList.filter(doc => (doc.role == 'coord'));
      this.depCoprds = this.teamList.filter(doc => (doc.role == 'dep-coord'));
      this.loading = false;
    });
  }

  ngOnInit() {
    this.fetchDepartment();
    // if(!this.user.uid){
    //   this.router.navigate(['/home'])
    // }
  }

}
