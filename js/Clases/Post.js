import { contenedorPosts, obtenerUsuarioPorId, publicaciones } from "../main.js";
import { Comentario } from "./Comentario.js";

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
            let btnEliminarSecundario = contenido2.querySelector(".btn-eliminar-post-secundario");
            let modalSecundario = contenido2.querySelector("#modalEliminarPostSecundario");
            let btnConfirmarEliminarSecundario = modalSecundario.querySelector("#confirmarEliminarPostSecundario");
            let btnCancelarEliminarSecundario = modalSecundario.querySelector("#cancelarEliminarPostSecundario");

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

            // Modal para añadir comentarios
            let modalAñadirComentario = document.createElement("div");
            modalAñadirComentario.classList.add("modal");
            modalAñadirComentario.setAttribute("id", "modalAñadirComentario");
            modalAñadirComentario.innerHTML = `
                <div class="modal-content">
                    <input type="text" id="nombreComentario" placeholder="Nombre">
                    <input type="email" id="emailComentario" placeholder="Correo electrónico">
                    <textarea id="textoComentario" placeholder="Escribe tu comentario aquí..."></textarea>
                    <button id="confirmarAñadirComentario">Añadir</button>
                    <button id="cancelarAñadirComentario">Cancelar</button>
                </div>
            `;
            contenido2.appendChild(modalAñadirComentario);

            let btnAñadirComentario = contenido2.querySelector(".btn-añadir-comentario");
            let btnConfirmarAñadir = modalAñadirComentario.querySelector("#confirmarAñadirComentario");
            let btnCancelarAñadir = modalAñadirComentario.querySelector("#cancelarAñadirComentario");

            // Contenedor de comentarios
            let comentarios = contenido2.querySelector("#comentarios");
            this.comments.forEach((comment) => {
                comentarios.appendChild(comment);
            });

            // Mostrar el modal al hacer clic en el botón de añadir comentario
            btnAñadirComentario.addEventListener("click", (event) => {
                event.stopPropagation();
                modalAñadirComentario.classList.add("show");
            });

            // Confirmar la adición del comentario
            btnConfirmarAñadir.addEventListener("click", (event) => {
                let nombre = modalAñadirComentario.querySelector("#nombreComentario").value.trim();
                let email = modalAñadirComentario.querySelector("#emailComentario").value.trim();
                let texto = modalAñadirComentario.querySelector("#textoComentario").value.trim();

                if (nombre && email && texto) {
                    toggleButton.classList.remove("hidden");
                    let nuevoComentario = new Comentario(this.id, this.comments.length + 1, nombre, email, texto);
                    this.addComment(nuevoComentario);
                    comentarios.replaceChildren();
                    this.comments.forEach((comment) => {
                        comentarios.appendChild(comment);
                    });
                }

                // Limpiar inputs y cerrar modal
                modalAñadirComentario.querySelector("#nombreComentario").value = "";
                modalAñadirComentario.querySelector("#emailComentario").value = "";
                modalAñadirComentario.querySelector("#textoComentario").value = "";
                modalAñadirComentario.classList.remove("show");
            });

            // Cancelar la adición del comentario
            btnCancelarAñadir.addEventListener("click", () => {
                modalAñadirComentario.classList.remove("show");
            });

            // Mostrar/ocultar comentarios
            let toggleButton = contenido2.querySelector("#toggleComentarios");
            if (this.comments.length === 0) {
                toggleButton.classList.add("hidden");
            }

            toggleButton.addEventListener("click", () => {
                comentarios.classList.toggle("hidden");
                toggleButton.textContent = comentarios.classList.contains("hidden")
                    ? "Mostrar comentarios"
                    : "Ocultar comentarios";
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
        this.comments.unshift(comment);
    }
    getComments() {
        return this.comments;
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
