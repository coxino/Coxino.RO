import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  IsSubmited = false;  
  constructor(private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.IsSubmited = params['issubmited'] == "true";      
    });
  }

  ngOnInit(): void {
  }
}
