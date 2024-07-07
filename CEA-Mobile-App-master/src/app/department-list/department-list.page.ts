import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.page.html',
  styleUrls: ['./department-list.page.scss'],
})
export class DepartmentListPage implements OnInit {

  constructor(public user: UserService, private router: Router, private fs: AngularFirestore,private loadingController:LoadingController,private loader:LoaderService) { }

  loading = false;
  depts;

  numOfMembers = async (dept) => {
    let count;
    await this.fs.collection('users').ref.where('dept', '==', dept).get().then(res => {
      count = res.docs.length;
    });
    return count;
  }


  fetchDepts =  async () => {
    this.loading=true
   await this.loader.showLoading()
    this.fs.collection('departments').get().toPromise().then(async(res) => {
      this.depts = res.docs.map(doc => {
        // let temp;
        // this.numOfMembers(doc.id).then(res => {
        //   console.log(res);
        // });
        return {
          id: doc.id,
          name: doc.data().name,
          // count: 0
        }
      });
      this.loading = false
    await  this.loader.hideLoading()

    })
  }


  ngOnInit() {
    this.fetchDepts();
  }

}
