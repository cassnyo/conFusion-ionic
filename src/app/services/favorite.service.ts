import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<number>;

  constructor() {
    this.favorites = [];
  }

  addFavorite(id: number): boolean {
    this.favorites.push(id);
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(favoriteId => favoriteId === id);
  }

}
