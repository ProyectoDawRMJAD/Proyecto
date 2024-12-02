import { Direccion } from "./Direccion.js";
import { Empresa } from "./Empresa.js";

class User{
    constructor(id,name,username,email,street,suite,city,zipcode,lat,lng,phone,website,companyName,catchPhrase,bs){
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.direccion = new Direccion(street,suite,city,zipcode,lat,lng);
        this.phone = phone;
        this.website = website;
        this.empresa = new Empresa(companyName,catchPhrase,bs);

    }
}
export{
    User
}