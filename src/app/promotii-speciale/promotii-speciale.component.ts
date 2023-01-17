import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { RequestServiceService } from '../Services/request-service.service';

@Component({
  selector: 'app-promotii-speciale',
  templateUrl: './promotii-speciale.component.html',
  styleUrls: ['./promotii-speciale.component.scss']
})
export class PromotiiSpecialeComponent implements OnInit {
 
  promotii : any[] = [];

  constructor(_requestService:RequestServiceService) {
    _requestService.requestPromotions().subscribe((data:any)=>{
      this.promotii = data;
      this.promotii = this.promotii.sort((x,y)=>{
        if(x.rating > y.rating)
        return -1;
        else
        return 1
      });

    });


    
  }
   
  ngOnInit(): void {
   
  }

}
