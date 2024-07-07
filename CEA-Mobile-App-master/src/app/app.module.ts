import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms'
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from './config';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import { OrganisersService } from './organisers.service';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx'
import {NativeStorage} from '@ionic-native/native-storage/ngx'
import {FirebaseX} from '@ionic-native/firebase-x/ngx'
import { UserService } from './user.service';
import { LoaderService } from './loader.service';
import { PaymentService } from './payment.service';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({mode:'ios'}),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // OrganisersService,
    BarcodeScanner,
    FirebaseX,
    UserService,
    LoaderService,
    PaymentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
