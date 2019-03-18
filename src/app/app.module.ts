import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DishService } from './services/dish.service';
import { LeaderService } from './services/leader.service';
import { PromotionService } from './services/promotion.service';
import { ProcessHttpMessageService } from './services/process-http-message.service';
import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';
import { FavoriteService } from './services/favorite.service';

import 'hammerjs';
import { ReservationPage } from './reservation/reservation.page';
import { ReservationPageModule } from './reservation/reservation.module';
import { CommentPage } from './comment/comment.page';
import { CommentPageModule } from './comment/comment.module';
import { LoginPageModule } from './login/login.module';
import { LoginPage } from './login/login.page';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    ReservationPage,
    CommentPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReservationPageModule,
    CommentPageModule,
    LoginPageModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DishService,
    LeaderService,
    PromotionService,
    ProcessHttpMessageService,
    FavoriteService,
    { provide: 'BaseURL', useValue: baseURL } // Inyectamos el BaseURL
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
