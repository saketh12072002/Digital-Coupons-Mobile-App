import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {AngularFirestore} from '@angular/fire/firestore'
import * as firebase from 'firebase'
import { PaymentService } from '../payment.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoaderService } from '../loader.service';
import {NativeStorage} from '@ionic-native/native-storage/ngx'
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  uid=''
  amount:any
  amtsubs
  limits={
    core:1000,
    coord:600,
    dc:400
  }
  // amount_is_loading = true
  balance=0
amountrequired=false
  keys:Array<any>=['1','2','3','4','5','6','7','8','9','0','Backspace']
  constructor(private fs:AngularFirestore,
    private auth:AngularFireAuth,
    private paymentService:PaymentService,
    public user:UserService,
    private router:Router,
    private loadingController:LoadingController,
    private loader:LoaderService,
    private nativeStorage:NativeStorage) {
    if(this.paymentService.vendor_uid=='' || this.paymentService.vendor_uid==null || this.paymentService.vendor_uid==undefined){
      this.router.navigateByUrl('/digital-coupons',{replaceUrl:true})
    }
    

   }
   sender_name=this.user.name
   rec_uid=this.paymentService.vendor_uid
   rec_email=this.paymentService.rec_email
  ngOnInit() {
  }
  verifyAmount(e){
    console.log(e)
    this.amountrequired=false
    if(!this.keys.includes(e.key)){
      return false
    }
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading..'
    });
    loading.present();

    return loading

  }
  async send_money(){
    // console.log(this.paymentService.user_role)
    // console.log(this.user.role)
    // console.log(this.user.dept)
    // console.log(this.user.total_given_to_a_user)
    // console.log(this.limits[this.paymentService.user_role])
    if(!this.amount){
      return
    }
    else if(this.paymentService.collection!='vendors' && (this.paymentService.user_role=='core' || this.paymentService.user_role=='coord' || this.paymentService.user_role=='dc') && this.user.role=='core' && this.user.dept=='finance' && (this.user.total_given_to_a_user+this.amount>this.limits[this.paymentService.user_role])){
      alert(`You can send only RS${this.limits[this.paymentService.user_role]-this.user.total_given_to_a_user} to this user`)      
    }
    else if(this.amount>0 && this.user.balance-this.amount>=0 && (this.paymentService.collection=='vendors'||this.paymentService.collection=='users')){
      await this.loader.showLoading()
      var sender_ref = this.fs.firestore.collection('users').doc(this.user.uid)
      var rec_ref = this.fs.firestore.collection(this.paymentService.collection).doc(this.paymentService.vendor_uid)
      var inc = firebase.firestore.FieldValue.increment(this.amount)
      var dec = firebase.firestore.FieldValue.increment(-this.amount)
      var date = new Date()
        sender_ref.update({amount:dec}).then(()=>{
          rec_ref.update({amount:inc}).then(()=>{
            console.log("done")
            this.fs.collection('transactions').add({
              to:this.rec_email,
              from:this.sender_name,
              amount:this.amount,
              from_uid:this.user.uid,
              rec_uid:this.rec_uid,
              day:date.getDate(),
              date:`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
              time:`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
              timestamp:date.valueOf(),
              to_name:this.paymentService.vendor_name,
              involved:[this.user.uid,this.rec_uid]
            }).then(async()=>{
              console.log("done pushing")
              this.paymentService.is_payment_successful=true
              this.paymentService.amount_paid=this.amount
              this.paymentService.timestamp = date.valueOf()
              await this.loader.hideLoading()
              this.router.navigateByUrl('payment-successful',{skipLocationChange:true})
            })
            
          }).catch(e=>{
            
            this.fs.collection('pending-transactions').add({
              to:this.rec_email,
              from:this.sender_name,
              amount:this.amount,
              from_uid:this.user.uid,
              rec_uid:this.rec_uid,
              date:`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
              time:`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
              timestamp:date.valueOf()
            }).then(async()=>{
              await this.loader.hideLoading()
              // loading.dismiss()
              alert("Your transaction is failed. If money is debited, then please contact Sai Krishna")
            })
          })    
        }).catch(async(e)=>{
          console.log(e)
          await this.loader.hideLoading()
          // loading.dismiss()
          alert("Your transaction is failed due to insufficient balance.")
        })
    
    }else{
      alert("Insufficient balance")
    }


//     this.fs.firestore.runTransaction((transaction)=>{
//       return transaction.get(sender_ref).then((send_ref)=>{
//         if(!send_ref.exists){

//         }else{
//           var new_amount = send_ref.data().amount-this.amount
//           transaction.update(sender_ref,{amount:new_amount})
//           transaction.get(rec_ref).then(rec=>{
//             if(!rec.exists){

//             }else{
//               var new_am = rec.data().amount+this.amount
//               transaction.update(rec_ref,{amount:new_am})
//             }
// })
//         }
//       })
//     }) 
  }
}
