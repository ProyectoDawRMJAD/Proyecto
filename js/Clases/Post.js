import { contenedorPosts, obtenerUsuarioPorId, publicaciones } from "../main.js";

class Post extends HTMLElement {
    constructor(userId, id, title, body) {
        super();
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.body = body;
        this.comments = [];
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            let shadow = this.attachShadow({ mode: "open" });

            let estilo = document.createElement("link");
            estilo.setAttribute("rel", "stylesheet");
            estilo.setAttribute("href", "./css/post.css");

            let plantilla = document.getElementById("post");
            let plantillaSecundaria = document.getElementById("postSecundario");
            let contenido = plantilla.content.cloneNode(true);
            let contenido2 = plantillaSecundaria.content.cloneNode(true);

            let contenedorPost = contenido.querySelector("#titulos");
            let postContent = contenido.querySelector("#postContent");

            contenido2.querySelector("#tituloPostSecundario").textContent = this.title;
            contenido2.querySelector("#contentPostSecundario").textContent = this.body;
            contenido2.querySelector("#autorPostSecundario").textContent = obtenerUsuarioPorId(this.userId).shadowRoot.querySelector("#userName").textContent;

            // Configuración del modal de eliminación secundario
            const btnEliminarSecundario = contenido2.querySelector(".btn-eliminar-post-secundario");
            const modalSecundario = contenido2.querySelector("#modalEliminarPostSecundario");
            const btnConfirmarEliminarSecundario = modalSecundario.querySelector("#confirmarEliminarPostSecundario");
            const btnCancelarEliminarSecundario = modalSecundario.querySelector("#cancelarEliminarPostSecundario");

            // Lógica para mostrar el modal secundario
            btnEliminarSecundario.addEventListener("click", (event) => {
                event.stopPropagation();
                modalSecundario.classList.add("show");
            });

            // Confirmar eliminación secundaria
            btnConfirmarEliminarSecundario.addEventListener("click", () => {
                obtenerUsuarioPorId(this.userId).posts.splice(obtenerUsuarioPorId(this.userId).posts.indexOf(this), 1);
                publicaciones.splice(publicaciones.indexOf(this), 1);
                this.remove();
                modalSecundario.classList.remove("show");
            });

            // Cancelar eliminación secundaria
            btnCancelarEliminarSecundario.addEventListener("click", () => {
                modalSecundario.classList.remove("show");
            });

            // Agregar comentarios al post
            let comentarios = contenido2.querySelector("#comentarios");
            this.comments.forEach(comment => {
                comentarios.appendChild(comment);
            });

            // Lógica para mostrar/ocultar comentarios
            let toggleButton = contenido2.querySelector("#toggleComentarios");
            toggleButton.addEventListener("click", () => {
                comentarios.classList.toggle("hidden");
                toggleButton.textContent = comentarios.classList.contains("hidden")? "Mostrar comentarios": "Ocultar comentarios";
            });

            shadow.appendChild(estilo);
            shadow.appendChild(contenido);
            shadow.appendChild(contenido2);

            let p = document.createElement("p");
            p.textContent = this.title;
            contenedorPost.appendChild(p);
            postContent.textContent = this.body;
        }
    }

    addComment(comment) {
        this.comments.push(comment);
    }

    mostrarPrincipal() {
        if (this.shadowRoot.querySelector("#contenedorPostSecundario")) {
            this.shadowRoot.querySelector("#contenedorPostSecundario").classList.add("hidden");
            this.shadowRoot.querySelector("#contenedorPostSecundario").classList.remove("contenedorPostSecundario");
            this.shadowRoot.querySelector("#contenedorPost").classList.remove("hidden");
            this.shadowRoot.querySelector("#contenedorPost").classList.add("contenedorPost");
        }
    }

    mostrarSecundario() {
        if (this.shadowRoot.querySelector("#contenedorPost")) {
            this.shadowRoot.querySelector("#contenedorPost").classList.add("hidden");
            this.shadowRoot.querySelector("#contenedorPost").classList.remove("contenedorPost");
            this.shadowRoot.querySelector("#contenedorPostSecundario").classList.remove("hidden");
            this.shadowRoot.querySelector("#contenedorPostSecundario").classList.add("contenedorPostSecundario");
        }
    }
}

export { Post };
