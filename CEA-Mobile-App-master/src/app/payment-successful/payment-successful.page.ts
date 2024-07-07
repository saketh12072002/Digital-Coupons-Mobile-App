import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-successful',
  templateUrl: './payment-successful.page.html',
  styleUrls: ['./payment-successful.page.css'],
})
export class PaymentSuccessfulPage implements OnInit {
  name:any=''
  status:any=''
  amount:any=0
  date:any=0
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  constructor(public paymentService:PaymentService,private router:Router) {
    if(!this.paymentService.is_payment_successful){
      this.router.navigateByUrl('/digital-coupons',{replaceUrl:true})
    }
   }

  ngOnInit() {
    this.name=this.paymentService.vendor_name
    this.amount=this.paymentService.amount_paid
    if(this.paymentService.is_payment_successful==true){
      this.status="Paid Successfully to"
    }
    else{
      this.status="Payment Failed"

    }
  }
  get_timestamp(){
    var d = new Date(this.paymentService.timestamp)
    var month = this.months[d.getMonth()]
    var year = d.getFullYear().toString()
    var date  = this.get_padded_value(d.getDate())
    var hours =  this.get_padded_value(d.getHours())
    var minutes = this.get_padded_value(d.getMinutes())
    var seconds = this.get_padded_value(d.getSeconds())
    return `${hours}:${minutes}:${seconds}, ${month} ${date} ${year}`
  }
  get_padded_value(x){
      
    return x.toString().padStart(2,'0')
  }
  ionViewDidLeave(){
    this.name=''
    this.status=''
    this.amount=''
    this.paymentService.reset()
  }
  go_back(){
    this.router.navigateByUrl('digital-coupons',{replaceUrl:true})
  }
}
