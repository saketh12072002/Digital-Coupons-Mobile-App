import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  is_loading = false
  loader:any
   constructor(private loadingController:LoadingController) {
    this.loader =  this.loadingController.create({
      message: 'Processing...',
      spinner:'bubbles',
      mode:'ios'
    });
    
   }
   async showLoading(){
   this.loader =  await this.loadingController.create({
     message:'Loading..'
   })
   this.loader.present()
   this.is_loading = true
}

async hideLoading(){
  try{
    this.loader.dismiss()
    this.is_loading = false
  }catch(e){
    this.is_loading = false
  }
}
}
