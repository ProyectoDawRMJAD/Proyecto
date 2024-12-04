class Tarea extends HTMLElement{
    constructor(userId,id,title,completed){
        super();
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
    connectedCallback(){
        let shadow = this.attachShadow({mode:"open"});

        let estilo = document.createElement("link");
        estilo.setAttribute("rel","stylesheet");
        estilo.setAttribute("href","./css/tarea.css");

        let plantilla = document.getElementById("todo");
        let contenido = plantilla.content;
        let tarea = contenido.cloneNode(true);
        
        shadow.appendChild(estilo);
        shadow.appendChild(user);
    }
}
export{
    Tarea
}