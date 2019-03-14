import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  currentPlatform: string;
  reservationForm: FormGroup;

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
  ) {
    this.createReservationForm();
  }

  ngOnInit() {
    this.platform.ready().then(
      currentPlatform => this.currentPlatform = currentPlatform
    );
  }

  createReservationForm() {
    this.reservationForm = this.formBuilder.group({
      guests: 3,
      smoking: false,
      dateTime: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.reservationForm.value);
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
