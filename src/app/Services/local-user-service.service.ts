import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalUser } from 'src/assets/Modele/LocalUser';
import { RequestServiceService } from './request-service.service';

@Injectable({
  providedIn: 'root'
})
export class LocalUserServiceService {
  refreshInventory() {
    this._requestService.getUserProfile(this.LocalUser).subscribe((response:any)=>{          
      this.LocalUserSubject$.next(response.localUser);         
    });
  }
  IsLoggedin() {
    return  this.LocalUser.authToken != 'undefined' && this.LocalUser.authToken.length > 0;
  }
  
  photoURL = "";
  LocalUser:LocalUser = new LocalUser();
  LocalUserSubject$ = new Subject<LocalUser>();
  
  constructor(private _requestService:RequestServiceService) {
    this.LocalUserSubject$.subscribe((x)=>{
      this.LocalUser = x ?? new LocalUser();
    });    
  }
  
  updateOnAllPages(){
    this.LocalUserSubject$.next(this.LocalUser);
  }


}
