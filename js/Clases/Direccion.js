import { Localizacion } from "./Localizacion.js";

class Direccion{
    constructor(street,suite,city,zipcode,lat,lng){
        this.street = street;
        this.suite = suite;
        this.city = city;
        this.zipcode = zipcode;
        this.localizacion = new Localizacion(lat,lng);
    }
}
export{
    Direccion
}