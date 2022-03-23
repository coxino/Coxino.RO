import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotii-speciale',
  templateUrl: './promotii-speciale.component.html',
  styleUrls: ['./promotii-speciale.component.scss']
})
export class PromotiiSpecialeComponent implements OnInit {
  mobile = false;

  constructor() { }

  ngOnInit(): void {
    if (window.screen.width < 920) { // 768px portrait
      this.mobile = true;
      console.debug("is mobile");
    }
  }

}
