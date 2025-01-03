import { obtenerUsuarioPorId, contenedorTareas, tareas } from "../main.js";

class Tarea extends HTMLElement {
    constructor(userId, id, title, completed) {
        super();
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.completed = completed;
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            let shadow = this.attachShadow({ mode: "open" });
            let estilo = document.createElement("link");
            estilo.setAttribute("rel", "stylesheet");
            estilo.setAttribute("href", "./css/tarea.css");

            let plantilla = document.getElementById("todo");
            let contenido = plantilla.content.cloneNode(true);
            let contenedor = contenido.querySelector("#contenedor");
            let titulo = contenido.querySelector("#name");
            let checkBox = contenido.querySelector("#checkPost");
            let btnEliminarTarea = contenido.querySelector("#btnEliminarTarea");
            let btnEditarTarea = contenido.querySelector("#btnEditarTarea");
            let modal = contenido.querySelector("#modalEliminarTarea");
            let btnConfirmarEliminar = contenido.querySelector("#confirmarEliminarTarea");
            let btnCancelarEliminar = contenido.querySelector("#cancelarEliminarTarea");

            // Modal para editar tarea
            const editarModal = document.createElement("div");
            editarModal.classList.add("modal-edit");
            editarModal.innerHTML = `
                <div class="modal-content">
                    <h2>Editar Tarea</h2>
                    <label for="editTitulo">Nuevo Título</label>
                    <input type="text" id="editTitulo" value="${this.title}">
                    <div class="modal-buttons">
                        <button id="guardarEdicion">Guardar</button>
                        <button id="cancelarEdicion">Cancelar</button>
                    </div>
                </div>
            `;
            editarModal.style.display = "none";
            shadow.appendChild(editarModal);

            titulo.textContent = this.title;
            checkBox.checked = this.completed;

            if (this.completed) {
                contenedor.classList.add("completed");
            }

            const toggleCompletion = () => {
                contenedor.classList.toggle("completed");
                this.completed = !this.completed;
                checkBox.checked = this.completed;
            };

            checkBox.addEventListener("click", (event) => {
                event.stopPropagation();
                toggleCompletion();
            });

            contenedor.addEventListener("click", () => {
                toggleCompletion();
            });

            btnEliminarTarea.addEventListener("click", (event) => {
                event.stopPropagation();
                modal.classList.add("active");
            });

            btnConfirmarEliminar.addEventListener("click", () => {
                obtenerUsuarioPorId(this.userId).tareas.splice(obtenerUsuarioPorId(this.userId).tareas.indexOf(this), 1);
                tareas.splice(tareas.indexOf(this), 1);
                this.remove();
                modal.classList.remove("active");
            });

            btnCancelarEliminar.addEventListener("click", () => {
                modal.classList.remove("active");
            });

            // Evento para abrir el modal de edición
            btnEditarTarea.addEventListener("click", (event) => {
                event.stopPropagation();
                editarModal.style.display = "flex";
            });

            // Guardar cambios en el título
            editarModal.querySelector("#guardarEdicion").addEventListener("click", () => {
                const nuevoTitulo = editarModal.querySelector("#editTitulo").value.trim();
                if (nuevoTitulo) {
                    this.title = nuevoTitulo;
                    titulo.textContent = nuevoTitulo;
                }
                editarModal.style.display = "none";
            });

            // Cancelar edición
            editarModal.querySelector("#cancelarEdicion").addEventListener("click", () => {
                editarModal.style.display = "none";
            });

            shadow.appendChild(estilo);
            shadow.appendChild(contenido);
        }
    }
}

export { Tarea };
