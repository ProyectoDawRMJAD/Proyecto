import { Comentario } from "./Clases/Comentario.js";
import { Foto } from "./Clases/Foto.js";

let jsons = ["json/comments.json","json/photos.json","json/posts.json","json/todos.json","json/users.json"];
let users= [],tareas= [],posts= [],comentarios = [],fotos= [];
cargarDatos();
console.log(comentarios);
console.log(fotos);


function cargarDatos(){
    jsons.forEach(json => {
        fetch(json).then(response => {
            if(!response.ok){
                throw new Error("Error al cargal el JSON");
            }
            return response.json();
        }).then(data => {
            switch(json){
                case "json/comments.json":
                    data.forEach(item =>{
                        let comentario = new Comentario(item.postID,item.id,item.name,item.email,item.body);
                        comentarios.push(comentario);
                    });
                    break;
                case "json/photos.json":
                    data.forEach(item =>{
                        let foto = new Foto(item.albumId,item.id,item.title,item.url,item.thumbnailUrl);
                        fotos.push(foto);
                    });
                    break;
            }
        }).catch(error => {
            console.error("Error:",error);
        })
    });
}