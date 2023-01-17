import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteConfig } from 'src/assets/statics/site_config';
import { BattleRoyaleComponent } from './battle-royale/battle-royale.component';
import { ContactComponent } from './contact/contact.component';
import { ContestComponent } from './contest/contest.component';
import { CupaRomanieiCalificariComponent } from './cupa-romaniei-calificari/cupa-romaniei-calificari.component';
import { CupaRomanieiComponent } from './cupa-romaniei/cupa-romaniei.component';
import { Giveaway150Component } from './giveaway150/giveaway150.component';
import { GiveawaysComponent } from './giveaways/giveaways.component';
import { HomeComponent } from './home/home.component';
import { ImageShowdownComponent } from './image-showdown/image-showdown.component';
import { PolicyComponent } from './policy/policy.component';
import { PostbackComponent } from './postback/postback.component';
import { PromotiiSpecialeComponent } from './promotii-speciale/promotii-speciale.component';
import { ShopComponent } from './shop/shop.component';
import { TosComponent } from './tos/tos.component';
import { TwitchLoginComponent } from './twitch-login/twitch-login.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: SiteConfig.tabHome, component: HomeComponent},
  { path: SiteConfig.tabPromo, component: PromotiiSpecialeComponent},
  { path: SiteConfig.tabGiveaway, component: GiveawaysComponent},
  { path: SiteConfig.tabContact, component: ContactComponent},
  { path: SiteConfig.tabShop, component: ShopComponent},
  { path: SiteConfig.tabPolicy, component: PolicyComponent},
  { path: SiteConfig.tabTOS, component: TosComponent},
  //################################################
  { path: "postback", component: PostbackComponent},
  { path: SiteConfig.tabCupa, component: BattleRoyaleComponent},
  { path: SiteConfig.tabCupaCalificari, component:CupaRomanieiCalificariComponent },
  {path: SiteConfig.tabGiveaway150, component:Giveaway150Component},
  {path: SiteConfig.tabContests, component:ContestComponent},

  {path:"tw-login", component:TwitchLoginComponent},

  {path:"rollimage", component:ImageShowdownComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
