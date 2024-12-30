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
            let modal = contenido.querySelector("#modalEliminarTarea");
            let btnConfirmarEliminar = contenido.querySelector("#confirmarEliminarTarea");
            let btnCancelarEliminar = contenido.querySelector("#cancelarEliminarTarea");
            
            // Configurar contenido inicial
            titulo.textContent = this.title;
            checkBox.checked = this.completed;
            if (this.completed) {
                contenedor.classList.add("completed");
            }

            // Función para alternar estado
            let toggleCompletion = () => {
                contenedor.classList.toggle("completed");
                this.completed = !this.completed;
                checkBox.checked = this.completed; // Sincroniza el estado del checkbox
            };
            
            // Evento para el checkbox
            checkBox.addEventListener("click", (event) => {
                event.stopPropagation(); // Evita que el evento "click" del contenedor se dispare
                toggleCompletion();
            });
            
            // Evento para el contenedor
            contenedor.addEventListener("click", () => {
                toggleCompletion();
            });

            // Mostrar modal al hacer clic en el botón de eliminar
            btnEliminarTarea.addEventListener("click", (event) => {
                event.stopPropagation(); // Evita que el evento "click" del contenedor se dispare
                modal.classList.add("active");
            });

            // Confirmar eliminación
            btnConfirmarEliminar.addEventListener("click", () => {
                this.remove(); // Eliminar el componente del DOM
                modal.classList.remove("active");
            });

            // Cancelar eliminación
            btnCancelarEliminar.addEventListener("click", () => {
                modal.classList.remove("active");
            });

            shadow.appendChild(estilo);
            shadow.appendChild(contenido);
        }
    }
}

export {
    Tarea
}
