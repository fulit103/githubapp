import { Component } from '@angular/core';
import { NavController,NavParams, LoadingController } from 'ionic-angular';
import {GitHubService} from '../../providers/github/github';

/*
  Generated class for the DetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/details/details.html',
  providers: [GitHubService]
})
export class DetailsPage {

  public readme = '';
  public repo;

  constructor(private navCtrl: NavController,
              private github: GitHubService,
              private navParams: NavParams,
              private loadingCtrl: LoadingController ) {

    this.repo = navParams.get('repo');

    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    loadingPopup.present();

    this.github.getDetails( this.repo ).subscribe(
      data => {
        this.readme = data.text();
        console.log( data.text() );
        loadingPopup.dismiss();
      },
      err => {
        if( err.status = 404 ){
          this.readme = "Este repo no tiene un README. :(";
        }
        else{
          console.error(err);
        }
        loadingPopup.dismiss();
      }
    )
  }

}
