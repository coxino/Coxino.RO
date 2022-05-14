import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cupa-romaniei-calificari',
  templateUrl: './cupa-romaniei-calificari.component.html',
  styleUrls: ['./cupa-romaniei-calificari.component.scss']
})
export class CupaRomanieiCalificariComponent implements OnInit {
  coxiPoints: any;
  defaultHeader:HttpHeaders = new HttpHeaders;

  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient,private cookieService: CookieService,private socialAuthService: SocialAuthService) {
    this.defaultHeader.append('Access-Control-Allow-Origin', '*');
    this.defaultHeader.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    this.defaultHeader.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    this.defaultHeader.append('username','coxino');
    var url = "https://coxino.go.ro:5000/api/ligaspecialelor/clasament";
    this.http.get(url,{headers:{'username':"coxino"}}).subscribe((xdata:any)=>{              
      this.coxiPoints = xdata.users;
    });
   }

  ngOnInit(): void {
   
  }

}
