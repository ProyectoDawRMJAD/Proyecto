import { imagenes } from "../main.js";

class Foto extends HTMLElement {
    constructor(albumId, id, title, url, thumbnail) {
        super();
        this.albumId = albumId;
        this.id = id;
        this.title = title;
        this.url = url;
        this.thumbnail = thumbnail;
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            let shadow = this.attachShadow({ mode: "open" });
            let plantilla = document.getElementById("foto");
            let estilo = document.createElement("link");
            estilo.setAttribute("rel", "stylesheet");
            estilo.setAttribute("href", "./css/foto.css");

            let contenido = plantilla.content;
            let clon = contenido.cloneNode(true);
            clon.querySelector("#numId").textContent = this.id;
            clon.querySelector("#nombre").textContent = this.title;

            let imagen = clon.querySelector("#imagen");
            imagen.src = this.url;
            imagen.onerror = () => {
                imagen.src = "/img/error.png";
            };

            // Modal de confirmación para eliminar
            let modalEliminar = document.createElement("div");
            modalEliminar.setAttribute("id", "modalEliminarFoto");
            modalEliminar.setAttribute("class", "modal");
            modalEliminar.innerHTML = `
                <div class="modal-content">
                    <p>¿Estás seguro de que deseas eliminar esta imagen?</p>
                    <button id="confirmarEliminarFoto">Sí</button>
                    <button id="cancelarEliminarFoto">No</button>
                </div>
            `;
            shadow.appendChild(modalEliminar);

            // Abrir modal al hacer clic en el botón eliminar
            let btnEliminarFoto = clon.querySelector("#btnEliminarFoto");
            btnEliminarFoto.addEventListener("click", () => {
                modalEliminar.style.display = "block";
            });

            // Confirmar eliminación
            modalEliminar.querySelector("#confirmarEliminarFoto").addEventListener("click", () => {
                let index = imagenes.findIndex((img) => img.id === this.id);
                if (index !== -1) {
                    imagenes.splice(index, 1); // Eliminar del array
                }

                this.remove(); // Remover el elemento del DOM
                modalEliminar.style.display = "none";
            });

            // Cancelar eliminación
            modalEliminar.querySelector("#cancelarEliminarFoto").addEventListener("click", () => {
                modalEliminar.style.display = "none";
            });

            // Modal para editar la foto
            let modalEditar = document.createElement("div");
            modalEditar.setAttribute("id", "modalEditarFoto");
            modalEditar.setAttribute("class", "modal");
            modalEditar.innerHTML = `
                <div class="modal-content">
                    <h3>Editar Foto</h3>
                    <form id="editarFotoForm">
                        <label for="nuevoTitulo">Nuevo Título:</label>
                        <input type="text" id="nuevoTitulo" value="${this.title}" required>
                        
                        <label for="nuevaImagen">Nueva Imagen:</label>
                        <input type="file" id="nuevaImagen" accept="image/*">
                        
                        <button type="submit" id="confirmarEditarFoto">Guardar Cambios</button>
                        <button type="button" id="cancelarEditarFoto">Cancelar</button>
                    </form>
                </div>
            `;
            shadow.appendChild(modalEditar);

            // Abrir modal al hacer clic en el botón editar
            let btnEditarFoto = clon.querySelector("#btnEditarFoto");
            btnEditarFoto.addEventListener("click", () => {
                modalEditar.style.display = "block";
            });

            // Manejar la edición de la foto
            modalEditar.querySelector("#editarFotoForm").addEventListener("submit", (event) => {
                event.preventDefault();

                // Obtener el nuevo título
                let nuevoTitulo = modalEditar.querySelector("#nuevoTitulo").value;

                // Manejar la nueva imagen
                let nuevaImagenInput = modalEditar.querySelector("#nuevaImagen");
                if (nuevaImagenInput.files.length > 0) {
                    let nuevaImagen = nuevaImagenInput.files[0];
                    let reader = new FileReader();

                    reader.onload = () => {
                        imagen.src = reader.result; // Actualizar la URL con la imagen cargada
                    };
                    reader.readAsDataURL(nuevaImagen); // Convertir la imagen a base64
                }

                // Actualizar el título
                this.title = nuevoTitulo;
                this.shadowRoot.querySelector("#nombre").textContent = nuevoTitulo;

                modalEditar.style.display = "none";
            });

            // Cancelar la edición
            modalEditar.querySelector("#cancelarEditarFoto").addEventListener("click", () => {
                modalEditar.style.display = "none";
            });

            shadow.appendChild(estilo);
            shadow.appendChild(clon);
        }
    }
}

export { Foto };
