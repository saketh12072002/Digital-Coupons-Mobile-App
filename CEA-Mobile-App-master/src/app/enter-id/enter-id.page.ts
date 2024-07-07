import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
import { LoadingController } from '@ionic/angular';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-enter-id',
  templateUrl: './enter-id.page.html',
  styleUrls: ['./enter-id.page.scss'],
})
export class EnterIdPage implements OnInit {
  roll_num=''
  limits ={
    core:1000,
    coord:600,
    dc:400,
    user:0
  }
  constructor(private fs:AngularFirestore,private user:UserService,private loadingController:LoadingController,private paymentService:PaymentService,private router:Router,private loader:LoaderService) { }

  ngOnInit() {
  }
  async process(){
   if(this.roll_num==''){
     return;
   }
   if(this.roll_num==this.user.rollNum){
     alert("You cannot send coupons to your own account!")
     return;
   }
   await this.loader.showLoading()
    this.fs.firestore.collection('users').where('rollnum','==',this.roll_num.toLowerCase()).get().then(async(r)=>{
      if(!r.empty){
        var doc = r.docs[0]

        if(doc.exists){
          this.paymentService.collection='users'
          this.paymentService.vendor_name=doc.data().name
          this.paymentService.vendor_uid = doc.id
          this.paymentService.user_role = doc.data().role
          this.paymentService.rec_email=doc.data().email
          this.paymentService.is_payment_successful=false
          if(this.user.dept=='finance' && this.user.role=='core'){
            var curr_day = new Date().getDate()
            // console.log(curr_day)
            this.fs.firestore.collection('transactions').where('rec_uid','==',this.paymentService.vendor_uid).where('from_uid','==',this.user.uid).where('day','==',curr_day).get().then(async(r1)=>{
              if(r1.empty){
                await  this.loader.hideLoading()
                this.router.navigateByUrl('payment',{replaceUrl:true})
              }else{
                this.user.total_given_to_a_user = 0
                r1.forEach(doc1=>{
                  // console.log(doc1.data()['amount'])
                  this.user.total_given_to_a_user = this.user.total_given_to_a_user + doc1.data()['amount']
                })
                // console.log(this.user.total_given_to_a_user)
                if(this.limits[this.paymentService.user_role]<=this.user.total_given_to_a_user){
                  alert('This user has reached the maximum limit. You cant send anymore to this user today')
                  await this .loader.hideLoading()
                  
                }else{
                  
                  await this.loader.hideLoading()
                  this.router.navigateByUrl('payment',{replaceUrl:true})
                }
              }
            })
          }else{
            await  this.loader.hideLoading()
            this.router.navigateByUrl('payment',{replaceUrl:true})
          }
    
        }else{
          await this.loader.hideLoading()
          alert('Invalid id')
        }
      
    }
    else{
      alert('No CEA account found')
      await this.loader.hideLoading()
    }
    })
  }
}
