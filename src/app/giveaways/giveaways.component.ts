import { AfterViewInit, Component, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { GiveawayRequestModel } from 'src/assets/Modele/ShopRequestModel';
import { LocalUserServiceService } from '../Services/local-user-service.service';
import { RequestServiceService } from '../Services/request-service.service';

@Component({
  selector: 'app-giveaways',
  templateUrl: './giveaways.component.html',
  styleUrls: ['./giveaways.component.scss']
})
export class GiveawaysComponent implements OnInit,AfterViewInit {
 
  GiveawaysObserver = new Subject<Array<any>>();
  GivewayItems: any = [];

  timer2$ = interval(1000);
  timer$ = interval(1000);
  
  constructor(private _requestService:RequestServiceService,
    private _localUserServiceService:LocalUserServiceService) {
    
  }

  async ngAfterViewInit(): Promise<void> {
    await new Promise<void>(resolve => setTimeout(()=>resolve(), 500)).then(()=>console.log("fired"));
    this.requestGiveaways();
    this.timer2$.subscribe(()=>{
      this.GivewayItems.forEach((element:any) => {
        if(this.isActive(element.givewayModel.endTime) == false && element.hasRefreshed == false)
        {
          this.requestGiveaways();
        }
      });
    });
  }
  
  buyTiket(gid:any)
  {
    var grm = new GiveawayRequestModel();
    grm.giveawayId = gid;
    grm.localUser = this._localUserServiceService.LocalUser;

    this._requestService.buyTicket(grm).subscribe((xdata:any)=>{         
      alert(("Ai achizitionat un produs cu success!")) ;
      this._localUserServiceService.refreshInventory();    
    },(err)=>{
      alert(err.error.text);
      this.requestGiveaways();      
      this._localUserServiceService.refreshInventory();   
    });
  }
  
  getCountDown(ends:any)
  {    
    var dif = (new Date(ends).valueOf() + 1500 - Date.now().valueOf()) / 1000;
    if(dif > 0){
      var ss = Math.floor(dif % 60).toString().padStart(2,"0");
      var ms = Math.floor(dif/60 % 60).toString().padStart(2,"0");
      var hs = Math.floor(dif/3600 % 24).toString().padStart(2,"0");
      var ds = Math.floor(dif/86400).toString().padStart(2,"0");   
      return "Se termina in " + ds + " zile " + hs + ":" + ms + ":" + ss;
    }
    else{           
      return "Inscrierea s-a incheiat!";
    }
  }

  isActive(ends:any)
  { 
    var dif = (new Date(ends).valueOf() + 1500 - Date.now().valueOf()) / 1000;
    return dif > 0;
  }
  
  requestGiveaways() {
    console.log(JSON.stringify(this._localUserServiceService.LocalUser) + "");
    
    this._requestService.requestGiveaways(this._localUserServiceService.LocalUser.userYoutubeID).subscribe((xdata:any)=>{
      this.GiveawaysObserver.next(xdata);      
    });
  }
  
  ngOnInit(): void {
    this.GiveawaysObserver.subscribe(data=>{
      this.GivewayItems = data;
      this.timer$.subscribe(()=>{
        this.GivewayItems.forEach((element:any) => {       
          element.time = this.getCountDown(element.givewayModel.endTime);  
          element.hasRefreshed = !this.isActive(element.givewayModel.endTime);   
        }); 
      });
    })
  }
  
}
