import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import {GitHubService} from '../../providers/github/github';
import { DetailsPage } from  '../details/details'

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [GitHubService]
})
export class HomePage {

  public foundRepos;
  public username;

  constructor(public navCtrl: NavController, 
              private github: GitHubService, 
              private loadingCtrl: LoadingController) {
  }

  getRepos() {

    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    loadingPopup.present();

    this.github.getRepos(this.username).subscribe(
      data => {
          this.foundRepos = data.json();
          console.log( data.json() );
          loadingPopup.dismiss();
      },
      err => {
        loadingPopup.dismiss();
        console.error(err);
      },
      () => {        
        console.log('getRepos completed');
      }
    );
  }

  goToDetails( repo ){
    this.navCtrl.push( DetailsPage, { repo: repo } );
  }

}
