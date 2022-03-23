import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HomeComponent } from './home/home.component';
import { PromotiiSpecialeComponent } from './promotii-speciale/promotii-speciale.component';
import { GiveawaysComponent } from './giveaways/giveaways.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { PacaneaComponent } from './pacanea/pacanea.component';

import { SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ShopComponent } from './shop/shop.component';
import { PolicyComponent } from './policy/policy.component';
import { TosComponent } from './tos/tos.component';
import { NgxWheelModule } from 'ngx-wheel';
import { LuckyWheelComponent } from './lucky-wheel/lucky-wheel.component';
import { CookieComponent } from './cookie/cookie.component';
import { PostbackComponent } from './postback/postback.component';
import { FormsModule } from '@angular/forms';
import { CupaRomanieiComponent } from './cupa-romaniei/cupa-romaniei.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotificationsComponent,
    HomeComponent,
    PromotiiSpecialeComponent,
    GiveawaysComponent,
    FooterComponent,
    ContactComponent,
    PacaneaComponent,
    ShopComponent,
    PolicyComponent,
    TosComponent,
    LuckyWheelComponent,
    CookieComponent,
    PostbackComponent,
    CupaRomanieiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    NgxWheelModule,
    FormsModule  
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {  
      autoLogin: false,      
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,          
          provider: new GoogleLoginProvider(
            '245884125377-c6kqdrfpr602abhaa8m3g3cqeluctpod.apps.googleusercontent.com', { scope: 'https://www.googleapis.com/auth/youtube.readonly', }
          )         
        }
      ]
    } as SocialAuthServiceConfig,
  }  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }