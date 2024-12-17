class Comentario extends HTMLElement {
    constructor(postId, id, name, email, body) {
        super();
        this.postId = postId;
        this.id = id;
        this.name = name;
        this.email = email;
        this.body = body;
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            let shadow = this.attachShadow({ mode: "open" });

            // Estilo
            let estilo = document.createElement("link");
            estilo.setAttribute("rel", "stylesheet");
            estilo.setAttribute("href", "./css/comentario.css");

            // Plantilla
            let plantilla = document.getElementById("comentario");
            let contenido = plantilla.content.cloneNode(true);

            // Rellenar contenido dinámicamente (usando clases)
            contenido.querySelector(".tituloComentario").textContent = this.name;
            contenido.querySelector(".autorComentario").textContent = this.email;
            contenido.querySelector(".contentComentario").textContent = this.body;

            // Añadir al Shadow DOM
            shadow.appendChild(estilo);
            shadow.appendChild(contenido);
        }
    }
}
export { Comentario };
