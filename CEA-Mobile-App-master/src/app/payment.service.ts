import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  vendor_name=''
  vendor_uid=''
  amount_paid=0
  collection=''
  rec_email=''
  timestamp=0
  user_role=''
  is_payment_successful=false
  constructor() { }
  reset(){
    this.vendor_name=''
    this.vendor_uid=''
    this.amount_paid=0
    this.is_payment_successful=false
    this.timestamp=0
    this.rec_email=''
    this.collection=''

  }
}
