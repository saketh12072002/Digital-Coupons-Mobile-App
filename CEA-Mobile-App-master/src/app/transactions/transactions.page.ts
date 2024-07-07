import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
// import consts from '../consts'
import {Router} from '@angular/router'
import {LoadingController} from '@ionic/angular'
import {NativeStorage} from '@ionic-native/native-storage/ngx'
import {AngularFirestore} from '@angular/fire/firestore'

import { UserService } from '../user.service';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.css'],
})
export class TransactionsPage implements OnInit {

  constructor(private user:UserService,private loadingController:LoadingController,private router:Router,private ns:NativeStorage,private fs:AngularFirestore) { }
  transactions:any=[]
  last_date:any
  hasura_id:any
  uid:any
balance:any
  async ngOnInit() {
    var loading =await this.presentLoading()
    console.log(this.router.url)
    this.fs.firestore.collection('transactions').where('involved','array-contains',this.user.uid).orderBy('timestamp','desc').limit(50).onSnapshot(r=>{
      if(this.transactions.length==0){
        r.forEach(doc=>{
          this.transactions.push(doc.data())
        })
        if(this.transactions.length>0){
          this.last_date = this.transactions[this.transactions.length-1].timestamp
        }
      }else{
        r.docChanges().forEach(doc=>{
          if(doc.type=='added'){
            this.transactions.splice(0,0,doc.doc.data())
            this.last_date = this.transactions[this.transactions.length-1].timestamp
          }
        })
      }



      loading.dismiss()
    })


  }
getname(transaction,uid){
  if(uid==this.user.uid){
    return transaction.to_name
  }else{
    return transaction.from
  }
}
  getsign(from){
    // console.log(from)
    if(from==this.user.uid){
      // console.log("from")
      return "-"
    }else{
      // console.log("to")
      return "+"
    }
  }
  getclass(from){
    if(from==this.user.uid){
      return 'subtract-money'
    }else{
      return 'add-money'
    }
  }
  getdate(date){
    var d = new Date(date)
    var d_new = new Date(d.getTime()).toLocaleString()
    return d_new
  }
  async loadData(e){


await this.fs.firestore.collection('transactions').where('involved','array-contains',this.user.uid).where('timestamp','<',this.last_date).orderBy('timestamp','desc').limit(50).get().then(r=>{
  r.forEach(doc=>{
    this.transactions.push(doc.data())
  })
  if(this.transactions.length>0){
    this.last_date = this.transactions[this.transactions.length-1].timestamp
  }
  e.target.complete()
})


  }

gotohome(){
  this.router.navigate(['home'])
}
  async presentLoading() {
    const loading =await this.loadingController.create({
      message: 'Loading..'
    });
   loading.present();

    return loading

  }
  ionViewDidLeave(){
    
  }
}
