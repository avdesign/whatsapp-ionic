import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ChatInvitationProvider } from '../providers/chat-invitation/chat-invitation';
//import { MainPage } from '../pages/main/main';
import { LoginOptionsPage } from '../pages/login-options/login-options';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  /**s
   * Página inicial
   */
  rootPage: any = LoginOptionsPage; //MainPage; //

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private chatInvitation: ChatInvitationProvider) {

    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //Fica ouvindo FirebaseDynamicLinks
      this.chatInvitation.listen();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
