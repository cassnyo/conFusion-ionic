import { Component, OnInit, Inject } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Dish } from '../shared/dish';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favoriteDishes: Dish[];
  favoriteDishesErrorMessage: string;

  constructor(
    private favoriteService: FavoriteService,
    @Inject('BaseURL') public baseUrl
  ) { }

  ngOnInit() {
    this.getFavoriteDishes();
  }

  getFavoriteDishes() {
    this.favoriteService.getFavorites().subscribe(
      favoriteDishes => this.favoriteDishes = favoriteDishes,
      error => this.favoriteDishesErrorMessage = error
    );
  }

  deleteFavorite(item: IonItemSliding, id: number) {
    console.log(`Delete ${id}`);
    this.favoriteService.deleteFavorite(id).subscribe(
      favoriteDishes => this.favoriteDishes = favoriteDishes,
      error => this.favoriteDishesErrorMessage = error
    );
    item.close();
  }

}
