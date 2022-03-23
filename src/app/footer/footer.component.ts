import { Component, OnInit } from '@angular/core';
import {SiteConfig} from '../../assets/statics/site_config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  sitename = SiteConfig.SiteName;
  constructor() { }

  ngOnInit(): void {
  }

}
