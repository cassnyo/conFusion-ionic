import {Component, Inject, OnInit} from '@angular/core';
import {DishService} from '../services/dish.service';
import {PromotionService} from '../services/promotion.service';
import {LeaderService} from '../services/leader.service';
import {Dish} from '../shared/dish';
import {Promotion} from '../shared/promotion';
import {Leader} from '../shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  featuredDish: Dish;
  featuredPromotion: Promotion;
  featuredLeader: Leader;

  featuredDishErrorMessage: string;
  featuredPromotionErrorMessage: string;
  featuredLeaderErrorMessage: string;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public baseUrl
  ) {
  }

  ngOnInit(): void {
    this.getFeaturedDish();
    this.getFeaturedPromotion();
    this.getFeaturedLeader();
  }

  getFeaturedDish() {
    this.dishService.getFeaturedDish().subscribe(
      featuredDish => this.featuredDish = featuredDish,
      error => this.featuredDishErrorMessage = error
    );
  }

  getFeaturedPromotion() {
    this.promotionService.getFeaturedPromotion().subscribe(
      featuredPromotion => this.featuredPromotion = featuredPromotion,
      error => this.featuredPromotionErrorMessage = error
    );
  }

  getFeaturedLeader() {
    this.leaderService.getFeaturedLeader().subscribe(
      featuredLeader => this.featuredLeader = featuredLeader,
      error => this.featuredLeaderErrorMessage = error
    );
  }

}
