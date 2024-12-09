class Comentario extends HTMLElement{
    constructor(postId,id,name,email,body){
        super();
        this.postId = postId;
        this.id = id;
        this.name = name;
        this.email = email;
        this.body = body;
    }
    connectedCallback(){
        if(!this.shadowRoot){
            let shadow = this.attachShadow({mode:"open"});
    
            let estilo = document.createElement("link");
            estilo.setAttribute("rel","stylesheet");
            estilo.setAttribute("href","./css/comentario.css");
    
            let plantilla = document.getElementById("comentario");
            let contenido = plantilla.content;
            let comentario = contenido.cloneNode(true);
    
            shadow.appendChild(estilo);
            shadow.appendChild(comentario);
        }
    }
}
export{
    Comentario
}