import { Component, OnInit } from '@angular/core';
import { LocalUserServiceService } from '../Services/local-user-service.service';
import { RequestServiceService } from '../Services/request-service.service';

@Component({
  selector: 'app-battle-royale',
  templateUrl: './battle-royale.component.html',
  styleUrls: ['./battle-royale.component.scss']
})
export class BattleRoyaleComponent implements OnInit {
  showClasament = true;
  allGames: any[] = [];
  boughtGames : any[] = [];
  filterTerm!:string;
  premii:string[] = [
    "SPECIALA |?| sau 150 ron x1",
    "SPECIALA |?| sau 150 ron x1",
    "SPECIALA |?| sau 100 ron x1",
    "SPECIALA |?| sau 100 ron x1",
    "SPECIALA |?| sau 50 ron x1",
    "SPECIALA |?| sau 50 ron x1",
    "50 RON X1",
    "50 RON X1",
    "50 RON X1",
    "50 RON X1",
    "50 RON X1",
    "2000 GOLD",
    "1000 GOLD",
    "500 GOLD",
    "250 GOLD",
  ];
    constructor(private _requestService:RequestServiceService,
      public _localUserServiceService:LocalUserServiceService) {
        this._requestService.GetAllGames().subscribe((data:any)=>{
          this.allGames = data.allgames
          console.log(JSON.stringify(this.allGames));
          this.allGames.forEach(element => {
            if(element.playerName != "")
            {    
              this.boughtGames.push(element);
            }            
          });

          this.boughtGames.sort((n1:any,n2:any)=>{
            if(n2.payOut == 0)
            return -1;

            if(n1.payOut / n1.bet > n2.payOut / n2.bet)
            return -1;
            if(n1.payOut / n1.bet < n2.payOut / n2.bet)
            return 1;

            return 0;
          })

          if(this.boughtGames.length < this.premii.length)
          {
            var diff = this.premii.length - this.boughtGames.length;
            for (let i = 0; i < diff; i++) {
              this.boughtGames.push({
                game:{name:"Locul "  + (i+1),provider:"SUPERBET",image:"https://superbet.ro/static/img/sb-logo.svg"},
                playerName:"Nimeni",                
                payOut:0,
                bet:1
              });
            }
          }
        });
      }
      
      ngOnInit(): void {
      }
      
      vinde(gameName:string)
      {
        console.log("sell " + gameName );
        if(this._localUserServiceService.IsLoggedin()){
          // if(this._localUserServiceService.LocalUser.coxiPoints < 1000)
          // {
          //   alert("Nu ai destul gold sa cumperi acest produs, stai pe live si strange gold!");
          //   return;
          // }
          this._requestService.SellGame(gameName, this._localUserServiceService.LocalUser.userYoutubeID).subscribe((data:any)=>{
            alert(data.message);
            if(data.message.includes("success"))
            {
              var element = this.allGames.filter(x=>x.game.name === gameName)[0];
              element.playerName = "";
              
              var element = this.boughtGames.filter(x=>x.game.name === gameName)[0];
              var nox = this.boughtGames.indexOf(element);
              this.boughtGames.splice(nox,1);
              
            }
            
            this._localUserServiceService.refreshInventory();
          });
        }
        else{
          alert("Te rog sa te autentifici!")
        }
      }
      
      cumpara(gameName:string)
      {
        console.log("buy " + gameName );
        if(this._localUserServiceService.IsLoggedin()){
          if(this._localUserServiceService.LocalUser.coxiPoints < 1000)
          {
            alert("Nu ai destul gold sa cumperi acest produs, stai pe live si strange gold!");
            return;
          }
          this._requestService.BuyGame(gameName, this._localUserServiceService.LocalUser.userYoutubeID).subscribe((data:any)=>{
            alert(data.message);
            if(data.message.includes("success"))
            {
              var element = this.allGames.filter(x=>x.game.name === gameName)[0];
              element.playerName = this._localUserServiceService.LocalUser.userName;
              this.boughtGames.push(element);
              
            }
            this._localUserServiceService.refreshInventory();
          });
        }
        else{
          alert("Te rog sa te autentifici!")
        }
      }
      
    }
    
    