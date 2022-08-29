import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  
  content = "";
  defaultHeader:HttpHeaders = new HttpHeaders;
  
  constructor(private http: HttpClient) { 
    if(window.innerWidth < 768){
      console.log("isMobile");
      
      this.defaultHeader.append('Access-Control-Allow-Origin', '*');
      this.defaultHeader.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      this.defaultHeader.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      var coxiUrl = "https://coxino.go.ro:5000/api/promo/getmpromo";    
      this.http.get(coxiUrl,{headers:this.defaultHeader}).subscribe((xdata:any)=>{         
        
        xdata;
      },(err:any)=>{
        console.log(err.error.text);
        
        this.content = err.error.text;
      });
    }
    else{
      this.defaultHeader.append('Access-Control-Allow-Origin', '*');
      this.defaultHeader.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      this.defaultHeader.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      var coxiUrl = "https://coxino.go.ro:5000/api/promo/getpromo";    
      this.http.get(coxiUrl,{headers:this.defaultHeader}).subscribe((xdata:any)=>{         
        
        xdata;
      },(err:any)=>{
        console.log(err.error.text);
        
        this.content = err.error.text;
      });
    }
  }
  
  ngOnInit(): void {
  }
  
}
