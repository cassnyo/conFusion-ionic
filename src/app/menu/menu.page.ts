import {Component, Inject, OnInit} from '@angular/core';
import {DishService} from '../services/dish.service';
import {Dish} from '../shared/dish';
import { FavoriteService } from '../services/favorite.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  dishes: Dish[];

  dishesErrorMessage: string;

  constructor(
    private dishService: DishService,
    private favoriteService: FavoriteService,
    private toastController: ToastController,
    @Inject('BaseURL') public baseUrl: string
  ) {
  }

  ngOnInit() {
    this.getDishes();
  }

  getDishes() {
    this.dishService.getDishes().subscribe(
      dishes => this.dishes = dishes,
      error => this.dishesErrorMessage = error
    );
  }

  addToFavorites(dishId: number) {
    console.log(`Adding to favorites ${dishId}`);
    this.favoriteService.addFavorite(dishId);
    this.presentToast(`Dish ${dishId} added as a favorite succesfully`);
  }

  async presentToast(message: string) {
    const toastController = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toastController.present();
  }


}
