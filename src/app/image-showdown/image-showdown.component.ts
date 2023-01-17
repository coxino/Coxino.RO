import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { RequestServiceService } from '../Services/request-service.service';

@Component({
  selector: 'app-image-showdown',
  templateUrl: './image-showdown.component.html',
  styleUrls: ['./image-showdown.component.scss']
})
export class ImageShowdownComponent implements OnInit {

  playIn = true;
  playOut = false;

  timer$ = interval(8000);
  
  currData = 0;
  promo: any;

  promotii : any[] = [];
  constructor(_requestService:RequestServiceService) {
    _requestService.requestPromotions().subscribe((data:any)=>{
      this.promotii = data;
      this.promo = data[this.currData];
      this.promotii = this.promotii.sort((x,y)=>{
        if(x.rating > y.rating)
        return -1;
        else
        return 1
      });

      
      this.timer$.subscribe(async x=>{
        this.playIn = false;
        this.playOut = true;
        await new Promise(r => setTimeout(r, 1000));
        if(this.currData < this.promotii.length-1){
        this.currData++;}
        else
        this.currData = 0;

        this.promo = data[this.currData];
        this.playIn = true;
        this.playOut = false;
      });
    });
  }

  ngOnInit(): void {
  }

}
