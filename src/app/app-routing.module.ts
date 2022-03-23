import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteConfig } from 'src/assets/statics/site_config';
import { ContactComponent } from './contact/contact.component';
import { CupaRomanieiComponent } from './cupa-romaniei/cupa-romaniei.component';
import { GiveawaysComponent } from './giveaways/giveaways.component';
import { HomeComponent } from './home/home.component';
import { PolicyComponent } from './policy/policy.component';
import { PostbackComponent } from './postback/postback.component';
import { PromotiiSpecialeComponent } from './promotii-speciale/promotii-speciale.component';
import { ShopComponent } from './shop/shop.component';
import { TosComponent } from './tos/tos.component';

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
  { path: SiteConfig.tabCupa, component: CupaRomanieiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
