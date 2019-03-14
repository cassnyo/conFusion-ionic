import { Component, OnInit, Inject } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Dish } from '../shared/dish';
import { IonItemSliding, ToastController, LoadingController, AlertController } from '@ionic/angular';

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
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    @Inject('BaseURL') public baseUrl
  ) { }

  ngOnInit() {
    this.getFavoriteDishes();
  }

  getFavoriteDishes() {
    this.favoriteService.getFavorites().subscribe(
      favoriteDishes => {
        this.favoriteDishes = favoriteDishes;
      },
      error => this.favoriteDishesErrorMessage = error
    );
  }

  async deleteFavorite(item: IonItemSliding, id: number) {
    const wantToDelete = await this.presentAlert(id);

    console.log(`Want to delete ${wantToDelete}`);

    if (wantToDelete) {
      const loading = await this.presentLoading();

      this.favoriteService.deleteFavorite(id).subscribe(
        favoriteDishes => {
          this.favoriteDishes = favoriteDishes;
          this.presentToast(`Dish ${id} deleted successfully`);
          loading.dismiss();
        },
        error => {
          this.favoriteDishesErrorMessage = error;
          loading.dismiss();
        }
      );
      item.close();
    }
  }

  async presentToast(message: string) {
    const toastController = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toastController.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Deleting ...'
    });
    await loading.present();
    return loading;
  }

  async presentAlert(id: number) {
    return new Promise<Boolean>(
      async (resolve, reject) => {
        const alert = await this.alertController.create({
          header: 'Confirm delete',
          message: `Do you want to delete Dish ${id}`,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('cancel');
                resolve(false);
              }
            },
            {
              text: 'Delete',
              handler: () => {
                console.log('delete');
                resolve(true);
              }
            }
          ]
        });
        alert.present();
      }
    );
  }

}
