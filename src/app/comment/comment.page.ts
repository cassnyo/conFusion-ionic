import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  currentPlatform: string;
  commentForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private platform: Platform
  ) {
    this.createCommentForm();
  }

  ngOnInit() {
    this.platform.ready().then(
      currentPlatform => this.currentPlatform = currentPlatform
    );
  }

  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [5, []],
      comment: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const comment: Comment = {
      rating: this.commentForm.get('rating').value,
      comment: this.commentForm.get('comment').value,
      author: this.commentForm.get('author').value,
      date: new Date().toISOString()
    };

    this.modalController.dismiss({
      'newComment': comment
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
