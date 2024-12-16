class Post extends HTMLElement{
    constructor(userId,id,title,body){
        super();
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.body = body;
        this.comments = [];
    }

    connectedCallback(){
        if(!this.shadowRoot){
            let shadow = this.attachShadow({mode:"open"});

            let estilo = document.createElement("link");
            estilo.setAttribute("rel","stylesheet");
            estilo.setAttribute("href","./css/post.css");

            let plantilla = document.getElementById("post");
            let plantillaSecundaria = document.getElementById("postSecundario");
            let contenido = plantilla.content;
            let contenido2 = plantillaSecundaria.content;
            let post = contenido.cloneNode(true);
            let postSecundario = contenido2.cloneNode(true);

            let postContent = post.querySelector("#postContent");
            let contenedorPost = post.querySelector("#titulos");

            postSecundario.querySelector("#tituloPostSecundario").textContent = this.title;
            postSecundario.querySelector("#contentPostSecundario").textContent = this.body;
            let comentarios = postSecundario.querySelector("#comentarios");
            this.comments.forEach(comment => {
                comentarios.appendChild(comment);
            });

            shadow.appendChild(estilo);
            shadow.appendChild(post);
            shadow.appendChild(postSecundario);

            let p = document.createElement("p");
            p.textContent = this.title;

            contenedorPost.appendChild(p);
            postContent.textContent = this.body;
        }
    }

    addComment(comment){
        this.comments.push(comment);
    }
    mostrarPrincipal(){
        this.shadowRoot.querySelector("#contenedorPostSecundario").classList.add("hidden");
        this.shadowRoot.querySelector("#contenedorPostSecundario").classList.remove("contenedorPostSecundario");
        this.shadowRoot.querySelector("#contenedorPost").classList.remove("hidden");
        this.shadowRoot.querySelector("#contenedorPost").classList.add("contenedorPost");
    }

    mostrarSecundario(){
        this.shadowRoot.querySelector("#contenedorPostSecundario").classList.add("contenedorPostSecundario");
        this.shadowRoot.querySelector("#contenedorPostSecundario").classList.remove("hidden");
        this.shadowRoot.querySelector("#contenedorPost").classList.add("hidden");
        this.shadowRoot.querySelector("#contenedorPost").classList.remove("contenedorPost");
        
    }
}
export{
    Post
}