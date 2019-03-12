import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from './dish.service';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<number>;

  constructor(
    private dishService: DishService
  ) {
    this.favorites = [];
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)) {
      this.favorites.push(id);
    }
    return true;
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    const index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      return this.getFavorites();
    } else {
      console.log(`Deleting non-existant favorite ${id}`);
      return throwError(`Deleting non-existant favorite ${id}`);
    }
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(favoriteId => favoriteId === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishService.getDishes()
    .pipe(
      map(dishes => dishes.filter(dish => this.isFavorite(dish.id)))
    );
  }

}
