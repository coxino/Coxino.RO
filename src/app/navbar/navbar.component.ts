import { Component, OnInit } from '@angular/core';
import {SiteConfig} from '../../assets/statics/site_config';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  sitename = SiteConfig.SiteName;
  navbarOpen = false;
  mobile = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  constructor() { }

  ngOnInit(): void {
    if (window.screen.width < 920) { // 768px portrait
      this.mobile = true;
      console.debug("is mobile");
    }
  }

}
