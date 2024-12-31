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

            // Modal de confirmación
            let modal = document.createElement("div");
            modal.setAttribute("id", "modalEliminarFoto");
            modal.setAttribute("class", "modal");
            modal.innerHTML = `
                <div class="modal-content">
                    <p>¿Estás seguro de que deseas eliminar esta imagen?</p>
                    <button id="confirmarEliminarFoto">Sí</button>
                    <button id="cancelarEliminarFoto">No</button>
                </div>
            `;
            shadow.appendChild(modal);

            // Botón eliminar
            let btnEliminarFoto = clon.querySelector("#btnEliminarFoto");
            btnEliminarFoto.addEventListener("click", () => {
                modal.style.display = "block";
            });

            // Confirmar eliminación
            modal.querySelector("#confirmarEliminarFoto").addEventListener("click", () => {
                imagenes.splice(imagenes.indexOf(this), 1);
                this.remove();
                modal.style.display = "none";
            });

            // Cancelar eliminación
            modal.querySelector("#cancelarEliminarFoto").addEventListener("click", () => {
                modal.style.display = "none";
            });

            shadow.appendChild(estilo);
            shadow.appendChild(clon);
        }
    }
}

export { Foto };
