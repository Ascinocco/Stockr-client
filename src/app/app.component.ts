/**
* App : $tockR
* File Name: app.component.ts
* Description : This is the typescript file for app Component, initializes App, sets the landing page
*             and has sign out functionality
* 
**/

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// services
import { GuardService } from './Services/GuardService';
import { AuthService } from './Services/AuthService';

// components
import { AuthComponent } from './Components/Auth/AuthComponent';
import { FeedComponent } from './Components/Feed/FeedComponent';

// routes
import { AppRoutes } from './Routes/Routes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AuthComponent;

  pages: Array<{title: string, component: any, isGuarded: boolean }> = AppRoutes;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public guardService: GuardService, public authService: AuthService) {
    this.initializeApp();
  }

  public isAuthenticated(): boolean
  {
    let authorized = this.guardService.isAuthenticated();
    if (authorized) {
      this.rootPage = FeedComponent;
      return true;
    } else {
      this.rootPage = AuthComponent;
      return false;
    }
  }

  public signOut(): void
  {
    this.authService.signOut()
    .subscribe((res) => {
      this.nav.push(AuthComponent);
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
