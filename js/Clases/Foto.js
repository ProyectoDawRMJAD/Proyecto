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
        let shadow = this.attachShadow({mode:"open"});
        let plantilla = document.getElementById("foto");
        let contenido = plantilla.content;

        let clon = contenido.cloneNode(true);

        clon.querySelector("#titulo").textContent = this.title;
        clon.querySelector("#imagen").src = this.url;

        shadow.appendChild(clon);
    }
}
export{
    Foto
}