import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-postback',
  templateUrl: './postback.component.html',
  styleUrls: ['./postback.component.scss']
})
export class PostbackComponent implements OnInit {
  
  data:string ="";
  defaultHeader:HttpHeaders = new HttpHeaders;
  userIP: any;
  
  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient,private cookieService: CookieService) { 
    this.defaultHeader.append('Access-Control-Allow-Origin', '*');
    this.defaultHeader.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    this.defaultHeader.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    this.http.get("https://api.ipify.org/?format=json").subscribe((data:any)=>{
      this.userIP = data.ip;});

    //deposit body      


    this.activatedRoute.queryParams.subscribe(params => {
      this.data = params['data'];
      if(this.data.length > 0)
      {
        var body = {
          userUpdateModel : {
          "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImNveGlubyAgICAiLCJQYXNzd29yZCI6ImNvc21pbjEyMzQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwibmJmIjoxNjQyNDgxMjQ1LCJleHAiOjE2NDMwODYwNDUsImlhdCI6MTY0MjQ4MTI0NSwiaXNzIjoiaHR0cDovL215c2l0ZS5jb20iLCJhdWQiOiJodHRwOi8vbXlhdWRpZW5jZS5jb20ifQ.2DjZdNm0UlGcnU2VXmA8zSan6Pch_1BKS4wybysiU2U",
          "userID":this.cookieService.get("userYoutubeID"),
          "username":"coxino",
          "email":this.cookieService.get("userEmail"),
          "ipadress":this.userIP
          },
          registration_id : this.data,
        }
        this.http.post("https://coxino.go.ro:5000/api/postback/register",body,{headers:this.defaultHeader}).subscribe(xdata=>{
        alert(xdata);
      });
    }
    else
    {
      var deposit_id = params['deposit_id'];
      var ammount = params['ammount'];
      var bodyx = {
        userUpdateModel : {
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImNveGlubyAgICAiLCJQYXNzd29yZCI6ImNvc21pbjEyMzQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwibmJmIjoxNjQyNDgxMjQ1LCJleHAiOjE2NDMwODYwNDUsImlhdCI6MTY0MjQ4MTI0NSwiaXNzIjoiaHR0cDovL215c2l0ZS5jb20iLCJhdWQiOiJodHRwOi8vbXlhdWRpZW5jZS5jb20ifQ.2DjZdNm0UlGcnU2VXmA8zSan6Pch_1BKS4wybysiU2U",
        "userID":this.cookieService.get("userYoutubeID"),
        "username":"coxino",
        "email":this.cookieService.get("userEmail"),
        "ipadress":this.userIP
        },
        deposit_id : deposit_id,
        ammount:ammount
      }
      this.http.post("https://coxino.go.ro:5000/api/postback/register",bodyx,{headers:this.defaultHeader}).subscribe(xdata=>{
      alert(xdata);
    });
    }
  });
  
}

ngOnInit(): void {
}

}
