import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uid=''
  balance=0
  email=''
  name=''
  role=''
  dept=''
  rollNum=''
  total_given_to_a_user=0
  constructor() { }
reset(){
  this.uid=''
  this.balance=0
  this.email=''
  this.name=''
  this.role=''
  this.dept=''
  this.rollNum=''
  this.total_given_to_a_user=0
}
}
