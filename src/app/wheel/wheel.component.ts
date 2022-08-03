import { Component, OnInit,ViewChild } from '@angular/core';
import { NgxWheelComponent } from 'ngx-wheel';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent implements OnInit {

  @ViewChild(NgxWheelComponent, { static: false })
  wheel: NgxWheelComponent = new NgxWheelComponent;

  idToLandOn = 0;

  items=[    
    {id:0, text:'CASTIG',fillStyle:'green'},
    {id:1, text:'PIERZI',fillStyle:'red'},
  ];
  constructor() { }

  async spin()
  { 
    this.idToLandOn = this.getRandomInt(this.items.length);
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.wheel.spin();    
  }

  getRandomInt(max:number)
  {
    return Math.floor(Math.random() * max);
  }

  ngOnInit(): void {

  }

  async ngAfterViewInit()
  {
    this.spin();
  }
  before(){

  }

  async after()
  {
    await new Promise(resolve => setTimeout(resolve, 12000));  
  }

  reset(){
    // Reset allows you to redraw the wheel
    // Use it after any change to wheel configurations or to allow re-spinning
    this.wheel.reset();
 }

}
