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
let btnPosts = document.getElementById("btnPosts")
let btnCreate = document.getElementById("btnAdd");
let btnTareas = document.getElementById("btnTareas");
let formularioCrearUsuario = document.getElementById("crearUsuario");
let formularioCrearImagen = document.getElementById("crearImagen");
let modalBtnSend = document.getElementById("modalBtnSend");
let divModal = document.getElementById("modalBtnSend");
let mostrarUsuariosSelect = document.getElementById("mostrarUsuariosSelect");
let divModalForm = document.getElementById("formularioSend");
let divPublicar = document.getElementById("publicacion");
let pgnPosts = document.getElementById("pgnPosts");
let pgnTareas = document.getElementById("pgnTareas");
let ubicacion = "usuarios";
export let contenedorTareas = document.getElementById("tareas");
export let contenedorPosts = document.getElementById("posts");

//EVENTLISTENERS
//Boton Tareas
btnTareas.addEventListener("click",()=>{
    pgnTareas.classList.remove("hidden");
    contenedor.classList.remove("prueba");
    contenedor.classList.add("hidden");
    pgnPosts.classList.add("hidden");
    cargarUsuariosSelect();
})

btnPosts.addEventListener("click",()=>{
    pgnPosts.classList.remove("hidden");
    contenedor.classList.remove("prueba");
    contenedor.classList.add("hidden");
    pgnTareas.classList.add("hidden");
})

buscador.addEventListener("input",(event)=>{
    switch(ubicacion){
        case "usuarios":
            busqueda("name",event.target.value,usuarios);
            break;
        case "imagenes":
            busqueda("title",event.target.value,imagenes);
    }
});

formularioCrearUsuario.addEventListener("submit", (event) => {
    event.preventDefault();
    switch(ubicacion){
        case "usuarios":
            crearUsuario();
            break;
    }
});

buscador.addEventListener("focus",(event)=>{
    event.target.style.border = "solid rgb(0, 162, 255) 2px";
})

buscador.addEventListener("focusout",(event)=>{
    event.target.style.border = "solid black 2px";
})

modalBtnSend.addEventListener("click",(event)=>{
    if(event.target == divModal){
        esconderModal();
    }
})

btnSend.addEventListener("click",()=>{
    divPublicar.classList.remove("hidden");
    mostrarModal();
    
})

btnCreate.addEventListener("click",()=>{
    switch(ubicacion){
        case "usuarios":
            formularioCrearUsuario.classList.remove("hidden");
            formularioCrearImagen.classList.add("hidden");
            break;
        case "imagenes":
            formularioCrearUsuario.classList.add("hidden");
            formularioCrearImagen.classList.remove("hidden");
            break;
    }
    mostrarModal();
    
    
})

btnImg.addEventListener("click",()=>{
    pgnPosts.classList.add("hidden");
    contenedor.classList.add("prueba");
    contenedor.classList.remove("hidden");
    contenedor.replaceChildren();
    contenedorTareas.classList.remove("active");
    contenedorPosts.classList.remove("active");
    mostrarDatos(imagenes);
    buscador.setAttribute("placeholder","Buscar Imágen");
    ubicacion = "imagenes";
})

btnUsers.addEventListener("click",()=>{
    pgnPosts.classList.add("hidden");
    contenedor.classList.add("prueba");
    contenedor.classList.remove("hidden");
    contenedor.replaceChildren();
    mostrarDatos(usuarios);
    buscador.setAttribute("placeholder","Buscar Usuario");
    ubicacion = "usuarios";
})

cargarDatos();
mostrarDatos(usuarios);
// Crear usuario
function crearUsuario(){
    let nombre = document.getElementById("nameForm");
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let website = document.getElementById("website");
    let valido = true;

    // Comprobar datos con regex
    if(!comprobarRegex(nombre, /^[A-Z][a-z]+(\s[A-Z][a-z]+)?$/)){
        valido = false;
    }
    if(!comprobarRegex(username, /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/)){
        valido = false;
    }

    if(!comprobarRegex(email, /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
        valido = false;
    }
    
    if(!comprobarRegex(phone, /^(\+?\d{2,3}\s\d{3}\d{3}\d{3})$/)){
        valido = false;
    }
    
    if(!comprobarRegex(website, /^\w+\.\w+$/)){
        valido = false;
    }
    
    if(!valido){
        return;
    }

    let newUser = new User(usuarios.length, nombre.value, username.value, email.value, phone.value, website.value);
    usuarios.push(newUser);
    mostrarDatos(usuarios);
    formularioCrearUsuario.querySelectorAll("input").forEach(element => {
        element.style.border = "";
    });
    esconderModal();
}

// Cargar usuarios a un select
function cargarUsuariosSelect(){
    usuarios.forEach(usuario => {
        let option=document.createElement("option");
        option.setAttribute("value",usuario.username);
        option.textContent=usuario.username;
        mostrarUsuariosSelect.add(option);
    });
}

function esconderModal(){
    divModal.classList.add("hiddenModal");
        divModalForm.classList.add("hiddenModal");
        setTimeout(()=>{
            divModal.classList.add("hidden");
            divModalForm.classList.add("hidden");
            divModal.classList.remove("modalDivSend");
            divModalForm.classList.remove("hiddenModal");
            divPublicar.classList.add("hidden");
            formularioCrearImagen.classList.add("hidden");
            formularioCrearUsuario.classList.add("hidden");
        },300);
}
function mostrarModal(){
    divModal.classList.remove("hidden");
    divModalForm.classList.remove("hidden");
    divModal.classList.add("modalDivSend");
}

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

function comprobarRegex(inputElement, regex) {
    if (regex.test(inputElement.value)) {
        inputElement.style.border = "2px solid green"; 
        return true;
    } else {
        inputElement.style.border = "2px solid red";
        return false;
    }
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