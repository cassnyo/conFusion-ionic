import {Component} from '@angular/core';

import {Platform, ModalController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import { ReservationPage } from './reservation/reservation.page';
import { Router } from '@angular/router';
import { LoginPage } from './login/login.page';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Menu',
            url: '/menu',
            icon: 'list-box'
        },
        {
            title: 'My favorites',
            url: '/favorites',
            icon: 'heart'
        },
        {
            title: 'Contact us',
            url: '/contact',
            icon: 'contact'
        },
        {
            title: 'About us',
            url: '/about',
            icon: 'information-circle'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private modalController: ModalController
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    async presentReserveModal() {
        const reserveModal = await this.modalController.create({
            component: ReservationPage
        });
        await reserveModal.present();
    }

    async presentLoginModal() {
        const loginModal = await this.modalController.create({
            component: LoginPage
        });
        await loginModal.present();
    }

}
