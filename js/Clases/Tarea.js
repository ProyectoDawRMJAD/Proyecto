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
            let shadow = this.attachShadow({mode:"open"});
            let estilo = document.createElement("link");
            estilo.setAttribute("rel","stylesheet");
            estilo.setAttribute("href","./css/tarea.css");

            let plantilla = document.getElementById("todo");
            let contenido = plantilla.content;
            let tarea = contenido.cloneNode(true);
            let contenedor = tarea.querySelector("#contenedor");
            let titulo = tarea.querySelector("#name");
            let checkBox = tarea.querySelector("#checkPost");
            
            shadow.appendChild(estilo);
            shadow.appendChild(tarea);

            checkBox.addEventListener("click",()=>{
                contenedor.classList.toggle("completed");
                if(this.completed){
                    this.completed = false;
                }else{
                    this.completed = true;
                }
            });

            if(this.completed){
                contenedor.classList.toggle("completed");
                checkBox.setAttribute("checked","checked");
            }
            titulo.textContent = this.title;

        }
    }
}
export{
    Tarea
}