import { LocalUser } from "./LocalUser";

export class ShopRequestModel
{
    localUserToken:string = "";
    item:ShopItem = new ShopItem();
}

export class GiveawayRequestModel
{
    localUser:LocalUser = new LocalUser();
    giveawayId:string = "";
}

export class ShopItem
{
    nume = "";
    stoc:number = 0;
    pret:number = 0;
    imagine = "";
    onlyMembers = false;
    requireAditional = false;
    optionalData = "";
    descriere = "";
    isVisible = false;
}