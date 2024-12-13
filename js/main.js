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
let btnSend = document.getElementById("btnSend");
let btnCreate = document.getElementById("btnAdd");
let formularioCrearUsuario = document.getElementById("crear");
let modalBtnSend = document.getElementById("modalBtnSend");
let divModal = document.getElementById("modalBtnSend");
let divModalForm = document.getElementById("formularioSend");
let divPublicar = document.getElementById("publicacion");
let divCrear = document.getElementById("crear");
let buscar = "usuarios";
export let contenedorTareas = document.getElementById("tareas");
export let contenedorPosts = document.getElementById("posts");

//EVENTLISTENERS
buscador.addEventListener("input",(event)=>{
    switch(buscar){
        case "usuarios":
            busqueda("name",event.target.value,usuarios);
            break;
        case "imagenes":
            busqueda("title",event.target.value,imagenes);
    }
});

// Evento crear Usuario
formularioCrearUsuario.addEventListener("submit",(event)=>{
    event.preventDefault();
    let nombre=document.getElementById("name").value;
    let username=document.getElementById("username").value;
    let email=document.getElementById("email").value;
    let phone=document.getElementById("phone").value;
    let website=document.getElementById("website").value;
    //comprobar datos regex
    let newUser= new User(usuarios.length,nombre,username,email,phone,website);
    usuarios.push(newUser);
    formularioCrearUsuario.reset();
    mostrarDatos(usuarios);
    divModal.classList.add("hiddenModal");
    divModalForm.classList.add("hiddenModal");
    setTimeout(()=>{
        divModal.classList.add("hidden");
        divModalForm.classList.add("hidden");
        divModal.classList.remove("modalDivSend");
        divModalForm.classList.remove("hiddenModal");
        divPublicar.classList.add("hidden");
        divCrear.classList.add("hidden");
    },300);
    
})

buscador.addEventListener("focus",(event)=>{
    event.target.style.border = "solid rgb(0, 162, 255) 2px";
})

buscador.addEventListener("focusout",(event)=>{
    event.target.style.border = "solid black 2px";
})

modalBtnSend.addEventListener("click",(event)=>{
    if(event.target == divModal){
        divModal.classList.add("hiddenModal");
        divModalForm.classList.add("hiddenModal");
        setTimeout(()=>{
            divModal.classList.add("hidden");
            divModalForm.classList.add("hidden");
            divModal.classList.remove("modalDivSend");
            divModalForm.classList.remove("hiddenModal");
            divPublicar.classList.add("hidden");
            divCrear.classList.add("hidden");
        },300);
    }
})

btnSend.addEventListener("click",()=>{
    divPublicar.classList.remove("hidden");
    //MODULARIZAR
    divModal.classList.remove("hidden");
    divModalForm.classList.remove("hidden");
    divModal.classList.add("modalDivSend");
})

btnCreate.addEventListener("click",()=>{
    divCrear.classList.remove("hidden");
    //MODULARIZAR
    divModal.classList.remove("hidden");
    divModalForm.classList.remove("hidden");
    divModal.classList.add("modalDivSend");
})

btnImg.addEventListener("click",()=>{
    contenedor.replaceChildren();
    contenedorTareas.classList.remove("active");
    contenedorPosts.classList.remove("active");
    mostrarDatos(imagenes);
    buscador.setAttribute("placeholder","Buscar Imágen");
    buscar = "imagenes";
})

btnUsers.addEventListener("click",()=>{
    contenedor.replaceChildren();
    mostrarDatos(usuarios);
    buscador.setAttribute("placeholder","Buscar Usuario");
    buscar = "usuarios";
})

cargarDatos();
mostrarDatos(usuarios);
console.log(imagenes);


function mostrarDatos(datos){
    datos.forEach(dato => {
        contenedor.appendChild(dato);
    }); 
}

function busqueda(tipo,busqueda,conjunto){
    contenedor.replaceChildren();
    let buscados = conjunto.filter(dato => dato[tipo].includes(busqueda));
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
    for (let i = 0; i < 500; i++) {
        let imagen = new Foto(fotos[i].albumID,fotos[i].id,fotos[i].title,fotos[i].url,fotos[i].thumbnailUrl);
        imagenes.push(imagen);
    }
}



