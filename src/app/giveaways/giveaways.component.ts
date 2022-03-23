import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { interval, Subject } from 'rxjs';

@Component({
  selector: 'app-giveaways',
  templateUrl: './giveaways.component.html',
  styleUrls: ['./giveaways.component.scss']
})
export class GiveawaysComponent implements OnInit {
  userIP: any;
  userYoutubeID: string;
  userName: string = "";
  photoURL: string= "";
  userEmail: string= "";
  isLoggedin: boolean =false;
  defaultHeader:HttpHeaders = new HttpHeaders;
  coxiPoints: any;
  socialUser: SocialUser = new SocialUser;
  GiveawaysObserver = new Subject<Array<any>>();
  GivewayItems: any = [];
  
  
  timer2$ = interval(1000);
  timer$ = interval(1000);
  
  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient,private cookieService: CookieService,private socialAuthService: SocialAuthService) {
    this.requestGiveaways();
    this.timer2$.subscribe(()=>{
      this.GivewayItems.forEach((element:any) => {
        if(this.isActive(element.givewayModel.endTime) == false && element.hasRefreshed == false)
        {
          this.requestGiveaways();
        }
      });
    });


    this.defaultHeader.append('Access-Control-Allow-Origin', '*');
    this.defaultHeader.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    this.defaultHeader.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    this.isLoggedin = false;
    this.http.get("https://api.ipify.org/?format=json").subscribe((data:any)=>{this.userIP = data.ip;});
    this.userYoutubeID = this.cookieService.get("userYoutubeID");
    if(this.userYoutubeID.length > 1)
    {
      this.userName = this.cookieService.get("userName");
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
        this.userYoutubeID = data.items[0].id;
        this.userEmail = this.socialUser.email;
        var photoURL = "https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&id="+this.userYoutubeID+"&access_token="+this.socialUser.authToken+"&client_id=245884125377-c6kqdrfpr602abhaa8m3g3cqeluctpod.apps.googleusercontent.com";
        this.userYoutubeID = data.items[0].id;
        this.http.get(photoURL).subscribe((xdata:any)=>{
          console.log(JSON.stringify(xdata));          
          this.photoURL = xdata.items[0].snippet.thumbnails.default.url;
          this.refreshPoints();
          this.SaveCookies();
        });
        //REQUEST FROM MY APP LOYALTY  POINTS USING USER`s channelID witch is the only identifier that i can retrieve from streamlabs          
      })      
    });
  }
  
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
      "ipadress":this.userIP
    }
    
    var coxiUrl = "https://coxino.go.ro:5000/api/loyalty/userCoins";    
    this.http.post(coxiUrl,body,{headers:this.defaultHeader}).subscribe((xdata:any)=>{              
      this.coxiPoints = xdata.coxiCoins;
    });
    
    this.requestGiveaways();
  }
  
  buyTiket(gid:any)
  {
    if(this.userYoutubeID == "" || this.userIP == "")
    {
      alert("Please Login");  
      return;    
    }
    var body = 
    {
      "userID": this.userYoutubeID,
      "username": this.userName,
      "email": this.userEmail,
      "ipadress": this.userIP,
      "givewayID": gid
    }
    
    var coxiUrl = "https://coxino.go.ro:5000/api/giveaway/buyTiket";    
    this.http.post(coxiUrl,body,{headers:this.defaultHeader}).subscribe((xdata:any)=>{         
      alert(("Ai achizitionat un produs cu success!"))      
    },(err)=>{
      alert(err.error.text);
      this.refreshPoints();
      this.requestGiveaways();
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
    var coxiUrl = "https://coxino.go.ro:5000/api/giveaway?viewerID=" + this.userYoutubeID;
    this.http.get(coxiUrl,{headers:this.defaultHeader}).subscribe((xdata:any)=>{
      this.GiveawaysObserver.next(xdata);      
    });
    
    
  }
  
  logout()
  {
    this.cookieService.deleteAll();
    this.userName = "";
    this.userYoutubeID = "";
    this.photoURL = "";
    this.userEmail = "";
    this.isLoggedin=false;
    location.reload();
  }
  
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
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
