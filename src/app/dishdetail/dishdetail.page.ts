import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {

  dish: Dish;
  dishErrorMessage: string;
  commentsCount: number;
  averageStarts: string;
  favorite: Boolean = false;

  constructor(
    private dishService: DishService,
    private favoriteService: FavoriteService,
    private activatedRoute: ActivatedRoute,
    @Inject('BaseURL') public baseUrl: string
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => this.getDish(params['id'])
    );
  }

  getDish(id: number) {
    this.dishService.getDish(id).subscribe(
      dish => {
        this.dish = dish;
        this.commentsCount = this.dish.comments.length;
        this.averageStarts = this.calculateAverageStarts(this.dish).toFixed(2);
        this.favorite = this.favoriteService.isFavorite(this.dish.id);
      },
      error => this.dishErrorMessage = error
    );
  }

  calculateAverageStarts(dish: Dish): number {
    let totalStars = 0;
    dish.comments.forEach(comment => totalStars += comment.rating);
    return totalStars / dish.comments.length;
  }

  addToFavorites(dishId: number) {
    console.log(`Adding to favorites ${dishId}`);
    this.favorite = this.favoriteService.addFavorite(dishId);
  }

}
