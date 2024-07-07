import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import {LoadingController,ModalController} from '@ionic/angular'
// import {HttpClient} from '@angular/common/http'
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-digital-coupons',
  templateUrl: 'digital-coupons.page.html',
  styleUrls: ['digital-coupons.page.scss'],
})
export class DigitalCouponsPage{

  constructor(
    private scanner:BarcodeScanner,
    private router:Router,
    private loadingController:LoadingController,
    private paymentService:PaymentService,
    private fs:AngularFirestore,
    private loader:LoaderService
    ) {
  
  }
  
  scanQR(){
    this.scanner.scan().then(data=>{
      if(!data.cancelled){
        if(data.text!=''||data.text!=null){
          this.process(JSON.parse(data.text))
        }
      }
      else{
        return;
      }
    })
  }

  async process(qrData){
  if(qrData['uid']!=undefined){

    await this.loader.showLoading()
    let resp=await this.fs.collection('vendors').doc(qrData['uid']).get().toPromise()
    if(resp.exists){
      this.paymentService.vendor_name=resp.data().name
      this.paymentService.vendor_uid=qrData['uid']
      this.paymentService.is_payment_successful=false
      this.paymentService.collection='vendors'
      this.paymentService.rec_email=resp.data().email
      await this.loader.hideLoading()
      this.router.navigateByUrl('payment')
      
    }
    else{
      alert("Invalid QR code")
     await this.loader.hideLoading()
    }
  }
  else{
    // this.loader.hideLoading()
    alert('Invalid QR code')
  }
  }
async open_enter_id(){
  // const modal = await this.modalController.create({
  //   component: EnterIdPage
  // });
  // return await modal.present();
  this.router.navigateByUrl('enter-id')
}

}