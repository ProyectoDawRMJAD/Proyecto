class User extends HTMLElement{
    //Constructor User
    constructor(id,name,username,email,phone,website){
        super();
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.posts = [];
        this.tareas = [];
    }

    connectedCallback(){
        if(!this.shadowRoot){
            let shadow = this.attachShadow({mode:"open"});
            let estilo = document.createElement("link");
            estilo.setAttribute("rel","stylesheet");
            estilo.setAttribute("href","./css/user.css");

            let plantilla = document.getElementById("user");
            let contenido = plantilla.content;
            let user = contenido.cloneNode(true);

            let btnEliminar = user.querySelector("#btnEliminar");

            user.querySelector("#name").textContent = this.name;
            user.querySelector("#userName").textContent = "@"+this.username;
            user.querySelector("#posts").textContent = this.posts.length;   
            user.querySelector("#tareas").textContent = this.tareas.length;

            shadow.appendChild(estilo);
            shadow.appendChild(user);

            btnEliminar.addEventListener('click',() =>{
                this.remove();
            });
        }
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