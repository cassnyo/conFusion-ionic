import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/shared';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  currentPlatform: string;
  loginForm: FormGroup;
  user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private storage: Storage,
    private modalController: ModalController,
    private platform: Platform
  ) {
    this.createLoginForm();
  }

  ngOnInit() {
    this.platform.ready().then(
      currentPlatform => this.currentPlatform = currentPlatform
    );
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });

    this.storage.get('user')
      .then(user => {
        if (user) {
          console.log(`db user: ${user}`);
          this.user = user;
          this.loginForm
            .patchValue({
              'username': this.user.username,
              'password': this.user.password
            });
        }
      });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  onSubmit() {
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;

    if (this.loginForm.get('remember').value) {
      this.storage.set('user', this.user);
    } else {
      this.storage.remove('user');
    }

    this.dismiss();
  }

}
