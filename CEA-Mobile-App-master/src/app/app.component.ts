import { Component, ViewChild } from '@angular/core';
import {NavController,NavParams, MenuController, AlertController} from '@ionic/angular'
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { OrganisersService } from './organisers.service';
import {Router} from '@angular/router'
import { UserService } from './user.service';
import {IonRouterOutlet} from '@ionic/angular'
import { PaymentService } from './payment.service';
import { LoaderService } from './loader.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(IonRouterOutlet,{static:false}) routeroutlet:IonRouterOutlet
  public appPages = [
    
    // {
    //   title: 'List',
    //   url: '/list',
    //   icon: 'list'
    // },
    
  ];
  public OrgTeamRoutes=[
    {
      title:'Digital Coupons',
      url:'/digital-coupons',
      icon:''
    },
    {
      title:'Transactions',
      url:'/transactions',
      icon:''
    }
  ]
  public AnonymousRoutes=[
    {
      title:'Log In',
      url:'/login',
      icon:'log-in'
    },

    {
      title:'New DC',
      url:'/dcreg',
      icon:'person-add'
    }
  ]
  depts={
    fr:'Facilities & Requirements',
    events:'Events',
    webops:'Web Operations',
    mad:'Design & Creatives',
    nirmaan:'Nirmaan',
    finance:'Finance',
    spons:'Spons',
    dsr:'Department & Student Relations'
  }
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // public organiser: OrganisersService,
    private navctrl:NavController,
    private router:Router,
    public user:UserService,
    private menu:MenuController,
    private alert:AlertController,
    private payment:PaymentService,
    private loader:LoaderService,
    private nativeStorage:NativeStorage,
    private fs:AngularFirestore,
    private auth:AngularFireAuth,
    
  ) {
    this.initializeApp();
  }
  isLoggedIn(){

    if(this.user.name!='' && this.user.name!=null && this.user.name!=undefined){
      // console.log('true')
      return true
    }
    // console.log('false')
    return false
  }
  
  isFinCore(){
    if(this.isLoggedIn()){
      if(this.user.role=='core' && this.user.dept=='finance'){
        return true
      }
      return false
    }
    return false
  }
  isCore(){
    if(this.isLoggedIn()){
      if(this.user.role=='core'){
        return true
      }
      return false
    }
    return false
  }
  isCoord(){
    if(this.isLoggedIn()){
      if(this.user.role=='coord'){
        return true
      }
      return false
    }
    return false
  }
  isDC(){
    if(this.isLoggedIn()){
      if(this.user.role=='dc'){
        return true
      }
      return false
    }
    return false
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      if(cordova.platformId="ios"){
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#ffffff')
        this.statusBar.styleDefault()
        this.statusBar.show()
        }
        if(cordova.platformId="android"){
          this.statusBar.overlaysWebView(false);
          this.statusBar.backgroundColorByHexString('#ffffff')
          this.statusBar.styleDefault()
          this.statusBar.show()
        }
      
      this.nativeStorage.getItem('info').then(r=>{
        if(r.uid!='' && r.uid!=undefined && r.uid!=null){
          this.fs.collection('users').doc(r.uid).get().toPromise().then(resp=>{
            if(resp.exists){
              var data = resp.data()
              this.user.balance = data.amount
              this.user.role=data.role
              this.user.dept=data.dept
              this.user.email=data.email
              this.user.name=data.name
              this.user.rollNum=data.rollnum
              this.user.uid = r.uid
              this.fs.collection('users').doc(r.uid).snapshotChanges().subscribe(d=>{
                this.user.balance = d.payload.data()['amount']

              })

          this.navctrl.navigateRoot('/home').then(()=>{
            this.splashScreen.hide();
            // alert(`Welcome ${this.user.name}`)                
          })



            }else{
              this.fs.collection('fest-users').doc(r.uid).get().toPromise().then(resp1=>{
                if(resp1.exists){
                  var data = resp1.data()
                  this.user.balance = 0
              this.user.role='fest-user'
              this.user.dept='fest-user'
              this.user.email=data.email
              this.user.name=data.name
              this.user.uid = resp1.id

              this.navctrl.navigateRoot('/home').then(()=>{
                this.splashScreen.hide();
                alert(`Welcome ${this.user.name}`)                
              })
                }else{

                  this.nativeStorage.clear().then(()=>{
                    this.splashScreen.hide();
                    this.navctrl.navigateRoot('/login')
                  })
                }
              }).catch(e=>{
                this.nativeStorage.clear().then(()=>{
                  this.splashScreen.hide();
                  this.navctrl.navigateRoot('/login')
                })
              })
            }
          }).catch(e=>{
            this.nativeStorage.clear().then(()=>{
              this.splashScreen.hide();
              this.navctrl.navigateRoot('/login')
            })
          })
        }
      }).catch(e=>{
        this.splashScreen.hide();
        this.navctrl.navigateRoot('/login')
      })
      this.platform.backButton.subscribeWithPriority(1,async()=>{
        
          const menu = await this.menu.getOpen();
              if(menu){
                  menu.close();
                  return; 
               }

          var curr = this.router.url
          console.log(curr)
          if(curr=='/login'){
            this.routeroutlet.pop()
          }else if(curr=='/payment'){
            if(this.loader.is_loading){
              return
            }else{
              this.navctrl.navigateRoot('/digital-coupons')
              this.payment.reset()
            }
          }
          else if(curr=='/home'){
            const a = await this.alert.create({
              header:"Exit App?",
              mode:'ios',
              message:"Do you want to exit the app?",
              buttons:[
                {
                 text:"No",
                 handler:()=>{

                 },
                 role:"cancel"
                 },{
                   text:"Yes",
                   handler:()=>{
                     
                    navigator['app'].exitApp()
                     
                   }
                 }
              ]
            })
            a.present()
          }else if(curr=='/payment-successful'){
             this.router.navigateByUrl('digital-coupons',{replaceUrl:true})
          }else{
              this.routeroutlet.pop()
          }
          
  
      })
    });
    
  }
  async logout_alert(){
    const a = await this.alert.create({
      header:"Logout?",
      mode:'ios',
      message:"Do you want to logout?",
      buttons:[
        {
         text:"No",
         handler:()=>{

         },
         role:"cancel"
         },{
           text:"Yes",
           handler:()=>{
             

             
           }
         }
      ]
    })
    a.present()
  }
  async logout(){
    await this.loader.showLoading()
    this.auth.auth.signOut().then(async()=>{
      this.nativeStorage.clear().then(async()=>{
        this.user.reset()
        this.payment.reset()
        await this.loader.hideLoading()
        this.navctrl.navigateRoot('/login')

      })

    })
  }
}
