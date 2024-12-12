class Foto extends HTMLElement{
    constructor(albumId,id,title,url,thumbnail){
        super();
        this.albumId = albumId;
        this.id = id;
        this.title = title;
        this.url = url;
        this.thumbnail = thumbnail;
    }
    connectedCallback(){
        if(!this.shadowRoot){
            let shadow = this.attachShadow({mode:"open"});
            let plantilla = document.getElementById("foto");
            let estilo = document.createElement("link");
            estilo.setAttribute("rel","stylesheet");
            estilo.setAttribute("href","./css/foto.css");
    
            let contenido = plantilla.content;
            let clon = contenido.cloneNode(true);
            clon.querySelector("#numId").textContent = this.id;
            clon.querySelector("#nombre").textContent = this.title;


            let imagen = clon.querySelector("#imagen");
            imagen.src = this.url;
            imagen.onerror = ()=>{
                imagen.src = "/img/error.png";
            }

            shadow.appendChild(estilo);
            shadow.appendChild(clon);
        }
       
    }
}
export{
    Foto
}