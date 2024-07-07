import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth'
import { UserService } from '../user.service'
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { LoaderService } from '../loader.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";

  constructor(private loader:LoaderService,public toastCtrl: ToastController, private nativeStorage:NativeStorage,public navCtrl: NavController, private auth: AngularFireAuth, public user: UserService, private fs: AngularFirestore, private router: Router, private loadingController: LoadingController) { }
  async signin() {
    if (this.username == "") {
      const toast = await this.toastCtrl.create({
        message: "Email cannot be empty",
        duration: 3000
      });
      toast.present()
    } else if (this.password == "") {
      const toast = await this.toastCtrl.create({
        message: "Password cannot be empty",
        duration: 3000
      });
      toast.present();
    } else {
      await this.loader.showLoading()
      this.auth.auth.signInWithEmailAndPassword(this.username, this.password).then(async(user) => {
        if (user) {
          this.user.uid = user.user.uid
          this.user.email = user.user.email
          this.fs.collection('users').doc(this.user.uid).get().subscribe(async(r) => {
            if (r.exists) {
              this.user.role = r.data().role
              this.user.dept = r.data().dept
              if (this.user.role == 'user') {
               await this.loader.hideLoading()
                alert('Your account is not activated yet')
              } else {
                this.user.name = r.data().name
                this.user.balance = r.data().amount ? r.data().amount : 0
                
                this.nativeStorage.setItem('info',{uid:this.user.uid}).then(async()=>{
                  await this.loader.hideLoading()
                  if(this.user.role=='core' || this.user.role=='coord' || this.user.role=='dc'){
                    
                    this.fs.collection('users').doc(this.user.uid).snapshotChanges().subscribe(async(d)=>{
                      this.user.balance = d.payload.data()['amount']
      
                    })

                  }
                  this.router.navigateByUrl('/home', { replaceUrl: true })
                })
              }
            } else {
              this.fs.collection('fest-users').doc(this.user.uid).get().subscribe(async(r1) => {
                if (r1.exists) {
                  this.user.name = r1.data().name
                  this.user.role = 'fest-user'
                  this.user.role = 'fest-user'
                  this.nativeStorage.setItem('info',{uid:this.user.uid}).then(async()=>{
                    await this.loader.hideLoading()
                    this.router.navigateByUrl('/home', { replaceUrl: true })
                  })
                } else {
                  await this.loader.hideLoading()
                  alert('User not found')
                }
              })
            }
          }, async(err) => {
           await  this.loader.hideLoading()
            alert('An error occured')
            console.log(err)
          })
        } else {
          await this.loader.hideLoading()
          alert('An error occured')
        }
      }).catch(async(e) => {
        await this.loader.hideLoading()
        console.log(e)
        if(e.code=="auth/invalid-email"){
          alert('Email is badly formatted')
        }
        else if(e.code=="auth/user-not-found"){
          alert('User not found')
        }
        else if(e.code=="auth/wrong-password"){
          alert('Invalid password')
        }
        else{
          alert("Unknown error logging in")
        }
      })
    }
  }

  ngOnInit() {

  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading..'
    });
    loading.present();

    return loading

  }
}

