import {Component, Inject, OnInit} from '@angular/core';
import {DishService} from '../services/dish.service';
import {Dish} from '../shared/dish';

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

}
