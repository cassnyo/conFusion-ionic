import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';
import { ToastController, ActionSheetController, ModalController } from '@ionic/angular';
import { CommentPage } from '../comment/comment.page';
import { Comment } from '../shared/comment';

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
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
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
    this.presentToast(`Dish ${dishId} added as a favorite succesfully`);
  }

  addNewComment(comment: Comment) {
    console.log(`Saving new comment`);
    this.dish.comments.push(comment);
  }

  async presentToast(message: string) {
    const toastController = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });
    toastController.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select action',
      buttons: [
        {
          text: 'Add to favorites',
          handler: () => this.addToFavorites(this.dish.id)
        },
        {
          text: 'Add comment',
          handler: () => this.openNewCommentModal()
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => console.log('Cancel clicked')
        }
      ]
    });
    await actionSheet.present();
  }

  async openNewCommentModal() {
    const commentModal = await this.modalController.create({
      component: CommentPage
    });
    await commentModal.present();
    const result = await commentModal.onDidDismiss();

    if (result.data) {
      this.addNewComment(result.data.newComment);
    }
  }

  onMoreClick() {
    this.presentActionSheet();
  }

}
