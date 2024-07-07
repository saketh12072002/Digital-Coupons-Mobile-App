import { Component, OnInit } from '@angular/core';
import {ToastController,NavController} from '@ionic/angular';
import { LoaderService } from '../loader.service';
import {AngularFirestore} from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup1',
  templateUrl: './signup1.page.html',
  styleUrls: ['./signup1.page.scss'],
})
export class Signup1Page implements OnInit {
  username: string ="";
  email: string="";
  name:string="";
  password: string ="";
  team: string="";
  mobile: string ="";
  cpassword: string ="";
  constructor(public toastCtrl:ToastController,public navCtrl:NavController,private fs:AngularFirestore,private auth:AngularFireAuth,private router:Router,private loader:LoaderService) { }
  async register(){
    if(this.username.length<4 || this.username.length>12){
      const toast =await this.toastCtrl.create({
        message: "Rollnumber must be within 4-12 characters long.",
        duration: 3000
      });
      toast.present();
    }else if(this.mobile.length!=10){
      const toast =await this.toastCtrl.create({
        message: "Mobile No. must have 10 digits.",
        duration: 3000
      });
      toast.present();
    }else if(this.email==""){
      const toast =await this.toastCtrl.create({
        message: "Please Enter your mail id.",
        duration: 3000
      });
      toast.present();
    }else if(this.team==""){
      const toast =await this.toastCtrl.create({
        message: "Please select your team.",
        duration: 3000
      });
      toast.present();
    }else if(this.name.trim()==""){
      const toast =await this.toastCtrl.create({
        message: "Please type your name.",
        duration: 3000
      });
      toast.present();
    }
    else if(this.password.length<6 || this.password.length>12){
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
      await this.loader.showLoading()
      this.auth.auth.createUserWithEmailAndPassword(this.email,this.password).then(async(r)=>{
        if(r.user){
          this.fs.firestore.collection('users').where('rollnum','==',this.username.trim().toLowerCase()).get().then(r1=>{
            if(r1.empty){
              this.fs.collection('users').doc(r.user.uid).set({
                name:this.name,
                dept:this.team,
                role:'user',
                role_to_be_assigned:'dc',
                amount:0,
                email:this.email,
                rollnum:this.username.trim().toLowerCase()
              }).then(async()=>{
               await this.loader.hideLoading()
                this.router.navigateByUrl('/login')
              })
            }else{
              r.user.delete().then(async()=>{
                await this.loader.hideLoading()
                alert('This rollnumber is already registered')
                this.cpassword=''
                this.password = ''
                this.username = ''
                
              })
            }
          })
          
        }else{
          await this.loader.hideLoading()
          alert('some error occured. please try again')
        }
      }).catch(async(e)=>{
       await this.loader.hideLoading()  
        alert('User already registered/ weak password')

      })
    }
  }
  ngOnInit() {
  }

  ionViewDidLeave(){
    this.name=''
    this.password=''
    this.cpassword=''
    this.email=''
    this.username=''
    this.team=''
  }

}
