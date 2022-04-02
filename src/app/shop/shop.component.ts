import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';
import { Subject } from 'rxjs';
import { coxiUser } from '../userdata/coxiUser';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild(NgxWheelComponent, { static: false }) wheel: any;
  usedAPIKey = "AIzaSyC8wHq1TI2yBL0dM5Q3CZuIcxlMRmWPTIE";
  coxiPoints = 0;
  socialUser: SocialUser = new SocialUser;
  isLoggedin: boolean = false;
  numeSpeci = "";
  userIP = "";
  canSpin = false;
  defaultHeader:HttpHeaders = new HttpHeaders;
  response = "";  
  userID = "";
  ShopItemsObserver = new Subject<Array<any>>();
  ShopItems:any = [];
  cadouStateOpen = "/assets/img/cadou.gif";
  cadouStateClosed = "/assets/img/cadou-closed.png";
  cadouStateOpened = "/assets/img/cadou-opened.png";
  superbetName = "";
  isSubscribed = false;
  userYoutubeID = "";
  photoURL = "";
  userEmail = "";
  userName = "";
  
  constructor(private socialAuthService: SocialAuthService,private http: HttpClient,private cookieService: CookieService) { 
    this.defaultHeader.append('Access-Control-Allow-Origin', '*');
    this.defaultHeader.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    this.defaultHeader.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }
  
  openGift()
  {
    
  }
  
  logout()
  {
    this.cookieService.deleteAll();
    this.userName = "";
    this.userID = "";
    this.photoURL = "";
    this.userEmail = "";
    this.userYoutubeID = "";
    this.isLoggedin=false;
    location.reload();
  }
  
  ngOnInit(): void {   
    
    this.ShopItemsObserver.subscribe(data=>{
      this.ShopItems = data;
    })
    this.http.get("https://api.ipify.org/?format=json").subscribe((data:any)=>{
    this.userIP = data.ip;});
    this.userYoutubeID = this.cookieService.get("userYoutubeID");
    
    if(this.userYoutubeID.length > 1)
    {
      this.userName = this.cookieService.get("userName");
      this.userID = this.userYoutubeID;
      this.photoURL = this.cookieService.get("photoURL");
      this.userEmail = this.cookieService.get("userEmail");
      console.log("" +  this.userYoutubeID);
      
      this.isLoggedin = true;
      this.refreshPoints();
      
    }
    
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      var uri = "https://www.googleapis.com/youtube/v3/channels?mine=true&access_token="+this.socialUser.authToken+"&client_id=245884125377-c6kqdrfpr602abhaa8m3g3cqeluctpod.apps.googleusercontent.com";
      
      this.http.get(uri).subscribe((data:any)=>{  
        this.userName = this.socialUser.firstName + "" + this.socialUser.lastName;
        this.CheckIfUserIsSubs(data.items[0].id);
        this.userYoutubeID = data.items[0].id;
        this.userEmail = this.socialUser.email;
        var photoURL = "https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&id="+this.userYoutubeID+"&access_token="+this.socialUser.authToken+"&client_id=245884125377-c6kqdrfpr602abhaa8m3g3cqeluctpod.apps.googleusercontent.com";
        this.userID = data.items[0].id;
        this.http.get(photoURL).subscribe((xdata:any)=>{
          console.log(JSON.stringify(xdata));          
          this.photoURL = xdata.items[0].snippet.thumbnails.default.url;
          this.refreshPoints();
          this.SaveCookies();
        });
        //REQUEST FROM MY APP LOYALTY  POINTS USING USER`s channelID witch is the only identifier that i can retrieve from streamlabs          
      })      
    });
    this.requestShop();
  }
  
  
  CheckIfUserIsSubs(id: any) {    
    var nextPage = "";
    var uri = "https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId="+id+"&key="+this.usedAPIKey+"&maxResults=50";
    
    this.http.get(uri).subscribe(async (data:any)=>{       
      var subscriber = this.ReadSubsPage(data.items);
      nextPage = data.nextPageToken ?? "";
      
      if(subscriber == false)
      {
        if(nextPage.length > 0)
        {
          this.readPage(nextPage,id);
        }
      }
    });
    
    
    //   isSubs = this.ReadSubsPage(chanels_first);
    //   // while(isSubs == false && nextPage != "")
    //   // {
    //   //   var urlYT = "https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId="+id+"&key=AIzaSyC8wHq1TI2yBL0dM5Q3CZuIcxlMRmWPTIE&maxResults=10&pageToken=" + nextPage;
    //   //   this.http.get(urlYT).subscribe(async (xdata: any) => {
    //   //     alert(nextPage);
    //   //     var chanels = xdata.items;
    //   //     nextPage = xdata.nextPageToken ?? "";
    //   //     isSubs = this.ReadSubsPage(chanels);
    //   //   }); 
    //   // }
    
    //   this.isSubscribed = isSubs;
    //   ///
    // });   
  }  
  readPage(nextPage: string,id:string) {  
    var uri = "https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId="+id+"&key="+this.usedAPIKey+"ng &maxResults=50&pageToken="+nextPage;
    this.http.get(uri).subscribe(async (data:any)=>{ 
      var subscriber = this.ReadSubsPage(data.items) == true     
      
      nextPage = data.nextPageToken ?? "";
      if(subscriber == false)
      {
        if(nextPage.length > 0)
        {
          this.readPage(nextPage,id);
        }
      }
    });    
  }
  
  ReadSubsPage(chanels:any):boolean{
    var returned = false;
    chanels.forEach((element:any) => {      
      console.log("CHANNEL " + element.snippet.resourceId.channelId);
      if(element.snippet.resourceId.channelId == "UCVys2Q0f659A5EutSddgcDA")
      {
        returned = true;
      }});
      
      return returned;
    };
    
    
    SaveCookies() {
      var someDate = new Date();
      var numberOfDaysToAdd = 6;
      var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
      this.cookieService.set("userYoutubeID",this.userYoutubeID,new Date(result));
      this.cookieService.set("photoURL",this.photoURL,new Date(result));
      this.cookieService.set("userEmail",this.userEmail,new Date(result));
      this.cookieService.set("userName",this.userName);
    }
    refreshPoints() {   
      var body = {
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImNveGlubyAgICAiLCJQYXNzd29yZCI6ImNvc21pbjEyMzQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwibmJmIjoxNjQyNDgxMjQ1LCJleHAiOjE2NDMwODYwNDUsImlhdCI6MTY0MjQ4MTI0NSwiaXNzIjoiaHR0cDovL215c2l0ZS5jb20iLCJhdWQiOiJodHRwOi8vbXlhdWRpZW5jZS5jb20ifQ.2DjZdNm0UlGcnU2VXmA8zSan6Pch_1BKS4wybysiU2U",
        "userID":this.userYoutubeID,
        "username":"coxino",
        "email":this.userEmail,
        "ipadress":this.userIP,
        "numeSuperbet":this.superbetName
      }
      
      var coxiUrl = "https://coxino.go.ro:5000/api/loyalty/userCoins";    
      this.http.post(coxiUrl,body,{headers:this.defaultHeader}).subscribe((xdata:any)=>{              
        this.coxiPoints = xdata.coxiCoins;
        this.superbetName = xdata.numeSuperbet;
      });
    }
    
    dorequest(itemID:string)
    {
      if(this.userID == "" || this.userIP == "")
      {
        alert("Please Login");  
        return;    
      }
      
      var body = {
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImNveGlubyAgICAiLCJQYXNzd29yZCI6ImNvc21pbjEyMzQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwibmJmIjoxNjQyNDgxMjQ1LCJleHAiOjE2NDMwODYwNDUsImlhdCI6MTY0MjQ4MTI0NSwiaXNzIjoiaHR0cDovL215c2l0ZS5jb20iLCJhdWQiOiJodHRwOi8vbXlhdWRpZW5jZS5jb20ifQ.2DjZdNm0UlGcnU2VXmA8zSan6Pch_1BKS4wybysiU2U",
        "userID":this.userYoutubeID,
        "username":"coxino",
        "email":this.userEmail,
        "ipadress":this.userIP,
        "itemID":itemID,
        "numeSpeciala":this.numeSpeci
      }
      var coxiUrl = "https://coxino.go.ro:5000/api/shop/cumpara";    
      this.http.post(coxiUrl,body,{headers:this.defaultHeader}).subscribe((xdata:any)=>{         
        alert(("Ai achizitionat un produs cu success!"))      
      },(err)=>{
        alert(err.error.text);
        var coxiUrl = "https://coxino.go.ro:5000/api/loyalty?userID=" + this.userID  + "&username=coxino&email=" + this.socialUser.email + "&ipadress=" + this.userIP;
        this.refreshPoints();
        this.requestShop();
      });
    }
    
    spin()
    {
      
    }
    
    requestShop() {
      var coxiUrl = "https://coxino.go.ro:5000/api/shop?username=coxino";
      this.http.get(coxiUrl,{headers:this.defaultHeader}).subscribe((xdata:any)=>{
        this.ShopItemsObserver.next(xdata);
      });
    }
    loginWithGoogle(): void {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
  }
  