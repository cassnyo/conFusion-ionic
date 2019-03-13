import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  currentPlatform: string;

  constructor(
    private platform: Platform,
    private modalController: ModalController
  ) { }


  ngOnInit() {
    this.platform.ready().then(
      currentPlatform => this.currentPlatform = currentPlatform
    );
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
