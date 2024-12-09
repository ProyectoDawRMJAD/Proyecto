class Tarea extends HTMLElement{
    constructor(userId,id,title,completed){
        super();
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
    connectedCallback(){
        if(!this.shadowRoot){
            let shadow = this.attachShadow({mode: "open"});
            let estilo = document.createElement("link");
            estilo.setAttribute("rel", "stylesheet");
            estilo.setAttribute("href", "./css/tarea.css");
            
            let plantilla = document.getElementById("todo");
            let contenido = plantilla.content;
            let tarea = contenido.cloneNode(true);
            let contenedor = tarea.querySelector("#contenedor");
            let titulo = tarea.querySelector("#name");
            let checkBox = tarea.querySelector("#checkPost");
            
            shadow.appendChild(estilo);
            shadow.appendChild(tarea);
            
            // Función para alternar estado
            const toggleCompletion = () => {
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
            
            if (this.completed) {
                contenedor.classList.add("completed");
                checkBox.setAttribute("checked", "checked");
            }
            titulo.textContent = this.title;

        }
    }
}
export{
    Tarea
}