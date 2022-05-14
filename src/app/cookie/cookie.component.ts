import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss']
})
export class CookieComponent implements OnInit {
  IsAccepted = false;
  constructor(private cookieService: CookieService) {
    this.IsAccepted = this.cookieService.get("IsAccepted") == "true" ?? false;
    console.log(this.IsAccepted);
    
  }

  accept(){
    this.cookieService.set("IsAccepted","true");
    this.IsAccepted = true;
  }

  ngOnInit(): void {
  }

}
