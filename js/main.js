import { Comentario } from "./Clases/Comentario.js";
import { Foto } from "./Clases/Foto.js";
import { Post } from "./Clases/Post.js";
import { Tarea } from "./Clases/Tarea.js";
import { User } from "./Clases/User.js";
import { fotos } from "/json/photos.js";
import { posts } from "/json/posts.js";
import { todos } from "/json/todos.js";
import { users } from "/json/users.js";
import { comments } from "/json/comments.js";

customElements.define("template-user",User);
customElements.define("template-comentario",Comentario);
customElements.define("template-post",Post);
customElements.define("template-todo",Tarea);
customElements.define("template-foto",Foto);

let usuarios = [];
let imagenes = [];
let contenedor = document.getElementById("prueba");
let buscador = document.getElementById("searchBar");
let textNotFound = document.getElementById("notFound");
let btnImg = document.getElementById("btnImg");
let btnUsers = document.getElementById("btnUsarios");

//EVENTLISTENERS
buscador.addEventListener("input",(event)=>{
    busqueda("name",event.target.value);
});

btnImg.addEventListener("click",()=>{
    contenedor.replaceChildren();
    mostrarDatos(imagenes);
})

btnUsers.addEventListener("click",()=>{
    contenedor.replaceChildren();
    mostrarDatos(usuarios);
})

cargarDatos();
mostrarDatos(usuarios);
console.log(imagenes);


function mostrarDatos(usuarios){
    usuarios.forEach(usuario => {
        contenedor.appendChild(usuario);
    }); 
}

function busqueda(tipo,busqueda){
    contenedor.replaceChildren();
    let buscados = usuarios.filter(usuario => usuario[tipo].includes(busqueda));
    if(buscados.length == 0){
        textNotFound.classList.remove("hidden");
    }else{
        textNotFound.classList.add("hidden");
    }
    mostrarDatos(buscados);
}

function cargarDatos(){
    //JSON de users a Array de objetos USER
    users.forEach(usuario => {
        let nuevoUsuario = new User(usuario.id,usuario.name,usuario.username,usuario.email,usuario.phone,usuario.website);
        usuarios.push(nuevoUsuario);
    });
    //JSON de POSTS a Array dentro de USER de POSTS
    posts.forEach(post => {
        let publicacion = new Post(post.userId,post.id,post.title,post.body);
        comments.forEach(comment => {
            let comentario = new Comentario(comment.postId,comment.id,comment.name,comment.email,comment.body);
            if(publicacion.id == comment.postId){
                publicacion.addComment(comentario);
            }
        });
        usuarios.forEach(usuario => {
            if(usuario.id == post.userId){
                usuario.addPost(publicacion);
            }
        });
    });
    //JSON de POSTS a Array dentro de USER de POSTS
    todos.forEach(tarea => {
        let nuevaTarea = new Tarea(tarea.userId,tarea.id,tarea.title,tarea.completed);
        usuarios.forEach(usuario => {
            if(usuario.id == nuevaTarea.userId){
                usuario.addTarea(nuevaTarea);
            }
        });
    });
    //JSON de fotos a Objetos FOTO
    fotos.forEach(fotos => {
        let imagen = new Foto(fotos.albumID,fotos.id,fotos.title,fotos.url,fotos.thumbnailUrl);
        imagenes.push(imagen);  
    });
        
}



