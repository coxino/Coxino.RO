import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalUser } from 'src/assets/Modele/LocalUser';
import { GiveawayRequestModel, ShopRequestModel } from 'src/assets/Modele/ShopRequestModel';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {
  requestPromotions() {
    var coxiUrl = "https://coxino.go.ro:5000/api/promo/getallpromo";
    return this.http.get(coxiUrl,{headers:this.defaultHeader});   
  }

  SellGame(gameName:string, userId:string)
  {
    var userModel = {
      GameName : gameName,
      UserId : userId
    }
    var coxiUrl = "https://coxino.go.ro:5000/api/getAllGames/sellGame";    
    return this.http.post(coxiUrl,userModel,{headers:this.defaultHeader});
  }
  BuyGame(gameName:string, userId:string)
  {
    var userModel = {
      GameName : gameName,
      UserId : userId
    }
    var coxiUrl = "https://coxino.go.ro:5000/api/getAllGames/buyGame";    
    return this.http.post(coxiUrl,userModel,{headers:this.defaultHeader});
  }
  GetAllGames() {
    var coxiUrl = "https://coxino.go.ro:5000/api/getAllGames";
    return this.http.get(coxiUrl,{headers:this.defaultHeader});    
  }
  buyTicket(grm:GiveawayRequestModel) {
    var coxiUrl = "https://coxino.go.ro:5000/api/giveaway/buyTiket";    
    return this.http.post(coxiUrl,grm,{headers:this.defaultHeader});
  }
  requestGiveaways(userYoutubeID:string) {
    var coxiUrl = "https://coxino.go.ro:5000/api/giveaway?viewerID=" + userYoutubeID;
    return this.http.get(coxiUrl,{headers:this.defaultHeader});    
  }
  requestUserPhoto(userYoutubeID: string, authToken: string) {
    var photoURL = "https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&id="+userYoutubeID+"&access_token="+authToken+"&client_id=245884125377-c6kqdrfpr602abhaa8m3g3cqeluctpod.apps.googleusercontent.com";          
    return this.http.get(photoURL);
  }
  requestUserSocials(authToken:string) {
    var uri = "https://www.googleapis.com/youtube/v3/channels?mine=true&access_token="+authToken+"&client_id=245884125377-c6kqdrfpr602abhaa8m3g3cqeluctpod.apps.googleusercontent.com";        
    return this.http.get(uri);
  }
  sendUserVerification(userId:string) {
    var coxiUrl = "https://coxino.go.ro:5000/api/shop/genvalcode?userID=" + userId;
    return this.http.get(coxiUrl,{headers:this.defaultHeader});
  }

  getUserProfile(localUser:LocalUser) {    
    var coxiUrl = "https://coxino.go.ro:5000/api/loyalty/userCoins";  
    return this.http.post(coxiUrl,localUser,{headers:this.defaultHeader});
  }
  
  getUserIPAdress(){
    return this.http.get("https://api.ipify.org/?format=json");
  }

  buyItem(ShopRequestModel:ShopRequestModel)
  {
    var coxiUrl = "https://coxino.go.ro:5000/api/shop/cumpara";    
    return this.http.post(coxiUrl,ShopRequestModel,{headers:this.defaultHeader});
  }

  getUserShop(userID:string){
    var coxiUrl = "https://coxino.go.ro:5000/api/shop?username=coxino&viewerId=" + userID;
    return this.http.get(coxiUrl,{headers:this.defaultHeader});
  }
  
  
  defaultHeader:HttpHeaders = new HttpHeaders;
  constructor(private http: HttpClient) {     
    this.defaultHeader.append('Access-Control-Allow-Origin', '*');
    this.defaultHeader.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    this.defaultHeader.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }
}
