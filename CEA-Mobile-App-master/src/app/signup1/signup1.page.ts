import { Component, OnInit } from '@angular/core';
import {ToastController,NavController} from '@ionic/angular';
@Component({
  selector: 'app-signup1',
  templateUrl: './signup1.page.html',
  // styleUrls: ['./signup1.page.scss'],
})
export class Signup1Page implements OnInit {
  username: string ="";
  email: string="";
  password: string ="";
  mobile: string ="";
  cpassword: string ="";
  college:string="";
  gender:string=""
  constructor(public toastCtrl:ToastController,public navCtrl:NavController) { }
  async register(){
    if(this.username.trim()==''){
      const toast =await this.toastCtrl.create({
        message: "Name is empty",
        duration: 3000
      });
      toast.present();
    }else if(this.mobile.trim().length!=10){
      const toast =await this.toastCtrl.create({
        message: "Mobile No. must have 10 digits.",
        duration: 3000
      });
      toast.present();
    }else if(this.email.trim()==""){
      const toast =await this.toastCtrl.create({
        message: "Please Enter your mail id.",
        duration: 3000
      });
      toast.present();
    }else if(this.email.trim()==""){
      const toast =await this.toastCtrl.create({
        message: "Please Enter your mail id.",
        duration: 3000
      });
      toast.present();
    }else if(this.password.length<6 || this.password.length>12){
      const toast =await this.toastCtrl.create({
        message: "Password must be within 6-12 characters.",
        duration: 3000
      });
      toast.present();
    }else if(this.cpassword!=this.password){
      const toast =await this.toastCtrl.create({
        message: " Confirm Password is not matching.",
        duration: 3000
      });
      toast.present();
    }else{
      this.navCtrl.navigateForward('/login');
    }
  }
  ngOnInit() {
  }

}
