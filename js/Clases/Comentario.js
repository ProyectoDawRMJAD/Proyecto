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
            let modalEliminar = contenido.querySelector("#modalEliminarComentario");
            let btnConfirmarEliminar = contenido.querySelector("#confirmarEliminarComentario");
            let btnCancelarEliminar = contenido.querySelector("#cancelarEliminarComentario");

            let btnEditar = contenido.querySelector(".btn-editar-comentario");
            let modalEditar = document.createElement("div");
            modalEditar.innerHTML = `
                <div class="modal active" id="modalEditarComentario">
                    <div class="modal-content">
                        <h3>Editar Comentario</h3>
                        <label for="editName">Nombre:</label>
                        <input id="editName" type="text" value="${this.name}">
                        <label for="editEmail">Email:</label>
                        <input id="editEmail" type="email" value="${this.email}">
                        <label for="editBody">Comentario:</label>
                        <textarea id="editBody">${this.body}</textarea>
                        <button id="confirmarEditarComentario">Guardar</button>
                        <button id="cancelarEditarComentario">Cancelar</button>
                    </div>
                </div>
            `;
            modalEditar.style.display = "none";

            // Mostrar modal de edición
            btnEditar.addEventListener("click", (event) => {
                event.stopPropagation();
                modalEditar.style.display = "block";
            });

            // Confirmar edición
            modalEditar.querySelector("#confirmarEditarComentario").addEventListener("click", () => {
                if(this.name == "" || this.email == "" || this.body == "") {
                    return;
                }

                this.name = modalEditar.querySelector("#editName").value;
                this.email = modalEditar.querySelector("#editEmail").value;
                this.body = modalEditar.querySelector("#editBody").value;

                // Actualizar los elementos visibles
                this.shadowRoot.querySelector(".tituloComentario").textContent = this.name;
                this.shadowRoot.querySelector(".autorComentario").textContent = this.email;
                this.shadowRoot.querySelector(".contentComentario").textContent = this.body;

                modalEditar.style.display = "none";
            });

            // Cancelar edición
            modalEditar.querySelector("#cancelarEditarComentario").addEventListener("click", () => {
                modalEditar.style.display = "none";
            });

            // Mostrar modal de eliminación
            btnEliminar.addEventListener("click", (event) => {
                event.stopPropagation();
                modalEliminar.classList.add("active");
            });

            // Confirmar eliminación
            btnConfirmarEliminar.addEventListener("click", () => {
                publicaciones.find(post => post.id == this.postId).comments.splice(publicaciones.find(post => post.id == this.postId).comments.indexOf(this), 1);
                this.remove(); // Eliminar el comentario
                modalEliminar.classList.remove("active");
            });

            // Cancelar eliminación
            btnCancelarEliminar.addEventListener("click", () => {
                modalEliminar.classList.remove("active");
            });

            // Añadir al Shadow DOM
            shadow.appendChild(estilo);
            shadow.appendChild(contenido);
            shadow.appendChild(modalEditar);
        }
    }
}

export { Comentario };
