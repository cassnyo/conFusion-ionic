import {Component, Inject, OnInit} from '@angular/core';
import {LeaderService} from '../services/leader.service';
import {Leader} from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  leaders: Leader[];
  leadersErrorMessage: string;

  constructor(
    private leaderService: LeaderService,
    @Inject('BaseURL') public baseUrl: string
  ) {
  }

  ngOnInit() {
    this.getLeaders();
  }

  getLeaders() {
    this.leaderService.getLeaders().subscribe(
      leaders => this.leaders = leaders,
      error => this.leadersErrorMessage = error
    );
  }

}
