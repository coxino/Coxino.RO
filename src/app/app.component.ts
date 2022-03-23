import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SiteConfig } from 'src/assets/statics/site_config';

import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {  
  route: string | undefined;
  
  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      if(location.path() != ''){
        switch(location.path().replace('/',''))
        {
          case SiteConfig.tabContact:
          this.route = SiteConfig.tabContactTitle;
          break;
          case SiteConfig.tabGiveaway:
          this.route = SiteConfig.tabGiveawayTitle;
          break;
          case SiteConfig.tabHome:
          this.route = SiteConfig.tabHomeTitle;
          break;
          case SiteConfig.tabPromo:
          this.route = SiteConfig.tabPromoTitle;
          break;
          case SiteConfig.tabShop:
          this.route = SiteConfig.tabShopTitle;
          break;
          case SiteConfig.tabPolicy:
          this.route = SiteConfig.tabPolicyTitle;
          break;
          case SiteConfig.tabTOS:
          this.route = SiteConfig.tabTOSTitle;
          break;
          case SiteConfig.tabCupa:
          this.route = SiteConfig.tabCupaTitle;
          break;
          
          default: 
          this.route = SiteConfig.SiteName;
          break;
        }
      } else {
        this.route = SiteConfig.SiteName;
      }
    });
  }
  
  
  ngOnInit(){}
}
