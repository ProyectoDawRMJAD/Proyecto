import { Direccion } from "./Direccion.js";
import { Empresa } from "./Empresa.js";

class User extends HTMLElement{
    //Constructor User
    constructor(id,name,username,email,phone,website,companyName,catchPhrase,bs){
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.empresa = new Empresa(companyName,catchPhrase,bs);
    }
    



}
export{
    User
}