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
            let contenido = plantilla.content;
            let tarea = contenido.cloneNode(true);

            let postContent = tarea.querySelector("#postContent");
            let contenedorPost = tarea.querySelector("#titulos");

            shadow.appendChild(estilo);
            shadow.appendChild(tarea);

            let p = document.createElement("p");
            p.textContent = this.title;

            contenedorPost.appendChild(p);
            postContent.textContent = this.body;
        }
    }

    addComment(comment){
        this.comments.push(comment);
    }
}
export{
    Post
}