import {Component, Inject, OnInit} from '@angular/core';
import {DishService} from '../services/dish.service';
import {Dish} from '../shared/dish';
import { FavoriteService } from '../services/favorite.service';

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
  }

}
