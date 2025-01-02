import { publicaciones } from "../main.js";

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

            // Elementos de la plantilla
            contenido.querySelector(".tituloComentario").textContent = this.name;
            contenido.querySelector(".autorComentario").textContent = this.email;
            contenido.querySelector(".contentComentario").textContent = this.body;

            let btnEliminar = contenido.querySelector(".btn-eliminar-comentario");
            let modal = contenido.querySelector("#modalEliminarComentario");
            let btnConfirmar = contenido.querySelector("#confirmarEliminarComentario");
            let btnCancelar = contenido.querySelector("#cancelarEliminarComentario");

            // Mostrar modal al hacer clic en eliminar
            btnEliminar.addEventListener("click", (event) => {
                event.stopPropagation();
                modal.classList.add("active");
            });

            // Confirmar eliminación
            btnConfirmar.addEventListener("click", () => {
                publicaciones.find(post => post.id == this.postId).comments.splice(publicaciones.find(post => post.id == this.postId).comments.indexOf(this), 1);
                this.remove(); // Eliminar el comentario
                modal.classList.remove("active");
            });

            // Cancelar eliminación
            btnCancelar.addEventListener("click", () => {
                modal.classList.remove("active");
            });

            // Añadir al Shadow DOM
            shadow.appendChild(estilo);
            shadow.appendChild(contenido);
        }
    }
}

export { Comentario };
