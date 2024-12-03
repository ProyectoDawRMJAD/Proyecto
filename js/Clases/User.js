import { Empresa } from "./Empresa.js";
class User extends HTMLElement{
    //Constructor User
    constructor(id,name,username,email,phone,website,companyName,catchPhrase,bs){
        super();
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.empresa = new Empresa(companyName,catchPhrase,bs);
        this.posts = [];
        this.tareas = [];
    }

    connectedCallback(){
        let shadow = this.attachShadow({mode:"open"});
        let plantilla = document.getElementById("user");
        let contenido = plantilla.content;
        let user = contenido.cloneNode(true);
        user.querySelector("#titulo").textContent = this.name;
        shadow.append(user);
    }
    addPost(post){
        this.posts.push(post);
    }
    addTarea(tarea){
        this.tareas.push(tarea);
    }


}
export{
    User
}