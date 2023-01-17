import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { LocalUser } from 'src/assets/Modele/LocalUser';
import { LocalUserServiceService } from '../Services/local-user-service.service';
import { RequestServiceService } from '../Services/request-service.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.scss']
})
export class UserComponentComponent implements OnInit, AfterViewInit {
  
  public photoURL = "";
  public _userEmail = "";  
  public _userEmailSecundar = "";
  public outCb:  any;
  
  /**Twitch Callback Data **/
  out = ($event: any) =>  {
    this.outCb = $event;
    var someDate = new Date();
    var numberOfDaysToAdd = 1;
    var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    this.cookieService.set("userYoutubeID",this.outCb.login,new Date(result));
    location.reload();
  };
  
  constructor(private socialAuthService: SocialAuthService,
    private cookieService: CookieService,
    public _localUserServiceService:LocalUserServiceService,
    private _requestService:RequestServiceService) {
    }
    
    ngAfterViewInit(): void {      
      this._localUserServiceService.updateOnAllPages();  
    }
    
    ngOnInit(): void {
      this.socialAuthService.authState.subscribe((user) => {    
        
        this._localUserServiceService.LocalUser.userName = user.firstName + " " + user.lastName;            
        this._localUserServiceService.LocalUser.userEmail = user.email;   
        
        this._requestService.requestUserSocials(user.authToken).subscribe((data:any)=>{          
          this._localUserServiceService.LocalUser.userYoutubeID = data.items[0].id;
          
          this._requestService.requestUserPhoto(this._localUserServiceService.LocalUser.userYoutubeID,user.authToken).subscribe((xdata:any)=>{
            console.log(JSON.stringify(xdata));          
            this._localUserServiceService.photoURL = xdata.items[0].snippet.thumbnails.default.url;
            this._requestService.getUserProfile(this._localUserServiceService.LocalUser).subscribe((response:any)=>{          
              this._localUserServiceService.LocalUserSubject$.next(response.localUser);  
              this.SaveCookies();        
            });
          });          
        });
      });
      
      
      
      this._localUserServiceService.LocalUser.authToken = this.cookieService.get("authToken");
      this._localUserServiceService.photoURL = this.cookieService.get("photoURL")  ;
      
      if(this._localUserServiceService.IsLoggedin() == false){ 
        console.log("FALSE LOGIN");               
        this.cookieService.deleteAll();
      }
      else
      {
        console.log("TRUE LOGIN"); 
        this.refreshUserProfile();
      }   
      
    }
    
    SaveCookies() {
      var someDate = new Date();
      var numberOfDaysToAdd = 2;
      var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
      
      this.cookieService.set("authToken",this._localUserServiceService.LocalUser.authToken,new Date(result));
      this.cookieService.set("photoURL", this._localUserServiceService.photoURL, new Date(result));
      this.refreshUserProfile();   
      this._localUserServiceService.updateOnAllPages();   
    }
    
    refreshUserProfile() { 
      if(this._localUserServiceService.IsLoggedin() == false)
      {
        this.cookieService.deleteAll();
        alert("Trebuie sa te reloghezi!");
        return;
      }
      else{  
        console.log("login ul este corect");
        this._requestService.getUserProfile(this._localUserServiceService.LocalUser).subscribe((response:any)=>{          
          this._localUserServiceService.LocalUserSubject$.next(response.localUser);         
        });
      }     
    }    
    
    loginWithGoogle(): void {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    
    verificaContul(){
      this._requestService.sendUserVerification(this._localUserServiceService.LocalUser.userYoutubeID).subscribe((xdata:any)=>{              
        alert(xdata.msg)
      });
    } 
    
    async logout()
    {
      this._localUserServiceService.LocalUser = new LocalUser();
      this.cookieService.deleteAll();
      await new Promise(f => setTimeout(f, 1000));
      location.reload();
    }
    
    saveSuperbetName(){  
      this._requestService.getUserProfile(this._localUserServiceService.LocalUser).subscribe((xdata:any)=>{              
        this._localUserServiceService.LocalUser = xdata.localUser;
        alert("Nume Superbet Salvat");
      }); 
    }
    
    
    saveEmailName(){
      this._localUserServiceService.LocalUser.userEmail = this._userEmail;
      this._localUserServiceService.LocalUser.userEmailSecundar = this._userEmailSecundar;
      
      this._requestService.getUserProfile(this._localUserServiceService.LocalUser).subscribe((xdata:any)=>{              
        this._localUserServiceService.LocalUser = xdata.localUser;
        alert("Email salvat!");
      });
    }    
  }
  