import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxWheelComponent } from 'ngx-wheel';
import { Subject } from 'rxjs';
import { LocalUser } from 'src/assets/Modele/LocalUser';
import { ShopItem, ShopRequestModel } from 'src/assets/Modele/ShopRequestModel';
import { LocalUserServiceService } from '../Services/local-user-service.service';
import { RequestServiceService } from '../Services/request-service.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild(NgxWheelComponent, { static: false }) wheel: any;
  usedAPIKey = "AIzaSyC8wHq1TI2yBL0dM5Q3CZuIcxlMRmWPTIE";
  
  localUser:LocalUser = new LocalUser();
  ShopItemsObserver = new Subject<Array<ShopItem>>();
  ShopItems:ShopItem[] = [];  
  
  constructor(private _requestService:RequestServiceService,
    private _localUserServiceService:LocalUserServiceService) { 
      
      _localUserServiceService.LocalUserSubject$.subscribe(x=>{
        this.localUser = x;
      });  
    }
    
    ngOnInit(): void {   
      
      this.ShopItemsObserver.subscribe(data=>{
        data.sort((x:any,y:any)=>{
          return (x.isVisible === y.isVisible)? 0 : x.isVisible? -1 : 1;
        })
        this.ShopItems = data;
      });
      
      this.requestShop();
    }
    
    buyItem(shopItem:ShopItem)
    {
      if(this._localUserServiceService.IsLoggedin() == false)
      {
        alert("Please Login");  
        return;    
      }
      
      var sm = new ShopRequestModel();
      sm.item = shopItem;
      sm.localUserToken = this._localUserServiceService.LocalUser.authToken;
      
      this._requestService.buyItem(sm).subscribe((xdata:any)=>{         
        alert(("Ai achizitionat un produs cu success!"));
        this._localUserServiceService.refreshInventory();
      },(err)=>{
        alert(err.error.text); 
        this._localUserServiceService.refreshInventory();      
      });
      
      
      this.requestShop();
    }   
    
    requestShop() {   
      this._requestService.getUserShop(this.localUser.userYoutubeID).subscribe((xdata:any)=>{
        this.ShopItemsObserver.next(xdata);

      });
    }
  }
  