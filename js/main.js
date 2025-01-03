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

export let usuarios = [];
export let imagenes = [];
export let publicaciones = [];
export let tareas = [];
let contenedor = document.getElementById("prueba");
let buscador = document.getElementById("searchBar");
let textNotFound = document.getElementById("notFound");
let btnImg = document.getElementById("btnImg");
let btnUsers = document.getElementById("btnUsarios");
let btnPosts = document.getElementById("btnPosts")
let btnCreate = document.getElementById("btnAdd");
let btnTareas = document.getElementById("btnTareas");
let contenedorformularioCrearUsuario = document.getElementById("crearUsuario");
let contenedorformularioCrearImagen = document.getElementById("crearImagen");
let contenedorformularioCrearTarea = document.getElementById("crearTarea");
let contenedorformularioCrearPost = document.getElementById("crearPost");
let formularioCrearTarea = document.getElementById("crearTareaForm");
let formularioCrearPost = document.getElementById("crearPostForm");
let formularioCrearImagen = document.getElementById("crearImagenForm");
let modalBtnSend = document.getElementById("modalBtnSend");
let divModal = document.getElementById("modalBtnSend");
let mostrarUsuariosSelect = document.getElementsByClassName("mostrarUsuarioSelect");
let albumesSelect = document.getElementById("albumesImagenes");
let divModalForm = document.getElementById("formularioSend");
let divPublicar = document.getElementById("publicacion");
let cantidadAlbumes;
let ubicacion = "usuarios";
let btn = document.getElementById('myBtn');
export let contenedorTareas = document.getElementById("tareas");
export let contenedorPosts = document.getElementById("posts");

document.getElementById("btnSeleccionarImagen").addEventListener("click", function() {
    document.getElementById("archivoImagen").click();
});

document.getElementById("archivoImagen").addEventListener("change", function() {
    let btnSeleccionarImagen = document.getElementById("btnSeleccionarImagen");
    if (this.files && this.files.length > 0) {
        btnSeleccionarImagen.textContent = "Imagen Seleccionada";
        btnSeleccionarImagen.style.backgroundColor = "#4CAF50";
        btnSeleccionarImagen.style.color = "#fff"; 
    } else {
        btnSeleccionarImagen.textContent = "Seleccionar Imagen";
        btnSeleccionarImagen.style.backgroundColor = ""; 
        btnSeleccionarImagen.style.color = ""; 
    }
});

formularioCrearImagen.addEventListener("submit",(event)=>{
    event.preventDefault();
    let albumId = document.getElementById("albumesImagenes").value;
    let tituloImagen = document.getElementById("tituloImagen").value;
    let archivoImagen = document.getElementById("archivoImagen").files[0];
    if(tituloImagen != "" && archivoImagen != null){
        contenedor.replaceChildren();
        let nuevaFoto = new Foto(parseInt(albumId),imagenes.length + 1,tituloImagen,URL.createObjectURL(archivoImagen),URL.createObjectURL(archivoImagen));
        imagenes.unshift(nuevaFoto);
        contenedor.appendChild(nuevaFoto);
        generarAlbumes();
        formularioCrearImagen.reset();
        btnSeleccionarImagen.textContent = "Seleccionar Imagen";
        btnSeleccionarImagen.style.backgroundColor = ""; 
        btnSeleccionarImagen.style.color = ""; 
        esconderModal();
    }
});

formularioCrearPost.addEventListener("submit",(event)=>{
    event.preventDefault();
    let userElegido = document.getElementById("usuarioPost");
    let title = document.getElementById("tituloPost");
    let body = document.getElementById("bodyPost");
    let usuario = usuarios.find(usuario => usuario.username == userElegido.value);
    if(!(title.value == "" || body.value == "")){
        let nuevaPublicacion = new Post(usuario.id,publicaciones.length,title.value,body.value);
        usuario.addPost(nuevaPublicacion);
        publicaciones.unshift(nuevaPublicacion);
        publicaciones.forEach(post => {
            contenedor.appendChild(post);
            post.mostrarSecundario();
        });
        nuevaPublicacion.mostrarSecundario();
        esconderModal();
    }    
});

formularioCrearTarea.addEventListener("submit",(event)=>{
    event.preventDefault();
    let userElegido = document.getElementById("usuarioTarea");
    let title = document.getElementById("tituloTarea");
    let usuario = usuarios.find(usuario => usuario.username == userElegido.value);
    if(title.value != ""){
        let nuevaTarea = new Tarea(usuario.id,tareas.length,title.value,false);
        usuario.addTarea(nuevaTarea);
        tareas.unshift(nuevaTarea);
        mostrarDatos(tareas); 
        esconderModal();
    }
    
});


//EVENTLISTENERS
//Boton Tareas
btnTareas.addEventListener("click",()=>{
    textNotFound.classList.add("hidden");
    contenedorTareas.classList.remove("active");
    contenedorPosts.classList.remove("active");
    contenedor.replaceChildren();
    ubicacion = "tareas";
    mostrarDatos(tareas);
    buscador.setAttribute("placeholder","Buscar Tarea");
    
});

btnPosts.addEventListener("click", () => {
    textNotFound.classList.add("hidden");
    contenedorTareas.classList.remove("active");
    contenedorPosts.classList.remove("active");
    contenedor.replaceChildren();
    publicaciones.forEach(post => {
        contenedor.appendChild(post);
        post.mostrarSecundario();
    });
    buscador.setAttribute("placeholder", "Buscar Post");
    ubicacion = "posts";
});

buscador.addEventListener("input",(event)=>{
    switch(ubicacion){
        case "usuarios":
            busqueda("username",event.target.value,usuarios);
            break;
        case "imagenes":
            busqueda("title",event.target.value,imagenes);
            break;
        case "tareas":
            busqueda("title",event.target.value,tareas);
            break;
        case "posts":
            busqueda("title",event.target.value,publicaciones);
            break;
    }
});

//Comprobaciones
contenedorformularioCrearUsuario.addEventListener("submit", (event) => {
    event.preventDefault();
    crearUsuario();
});

buscador.addEventListener("focus",(event)=>{
    event.target.style.border = "solid rgb(0, 162, 255) 2px";
});

buscador.addEventListener("focusout",(event)=>{
    event.target.style.border = "solid black 2px";
});

modalBtnSend.addEventListener("click",(event)=>{
    if(event.target == divModal){
        esconderModal();
    }
});

btnCreate.addEventListener("click",()=>{
    switch(ubicacion){
        case "usuarios":
            contenedorformularioCrearUsuario.classList.remove("hidden");
            contenedorformularioCrearImagen.classList.add("hidden");
            contenedorformularioCrearTarea.classList.add("hidden");
            contenedorformularioCrearPost.classList.add("hidden");
            break;
        case "imagenes":
            contenedorformularioCrearUsuario.classList.add("hidden");
            contenedorformularioCrearTarea.classList.add("hidden");
            contenedorformularioCrearImagen.classList.remove("hidden");
            contenedorformularioCrearPost.classList.add("hidden");
            cargarAlbumesSelect();
            break;
        case "tareas":
            contenedorformularioCrearTarea.classList.remove("hidden");
            contenedorformularioCrearUsuario.classList.add("hidden");
            contenedorformularioCrearImagen.classList.add("hidden");
            contenedorformularioCrearPost.classList.add("hidden");
            cargarUsuarioSelect();
            break;
        case "posts":
            contenedorformularioCrearUsuario.classList.add("hidden");
            contenedorformularioCrearTarea.classList.add("hidden");
            contenedorformularioCrearImagen.classList.add("hidden");
            contenedorformularioCrearPost.classList.remove("hidden");
            cargarUsuarioSelect();
            break;
    }
    mostrarModal();
});

btnImg.addEventListener("click",()=>{
    contenedor.classList.add("prueba");
    contenedor.classList.remove("hidden");
    textNotFound.classList.add("hidden");
    contenedor.replaceChildren();
    contenedorTareas.classList.remove("active");
    contenedorPosts.classList.remove("active");
    generarAlbumes();
    buscador.setAttribute("placeholder","Buscar Imágen");
    ubicacion = "imagenes";
});


btnUsers.addEventListener("click",()=>{
    textNotFound.classList.add("hidden");
    contenedor.classList.add("prueba");
    contenedor.classList.remove("hidden");
    contenedor.replaceChildren();
    ubicacion = "usuarios";
    buscador.setAttribute("placeholder","Buscar Usuario");
    mostrarDatos(usuarios);
});



window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { 
        btn.style.opacity = 1;  
        btn.style.pointerEvents = 'auto'; 
    } else {
        btn.style.opacity = 0;  
        btn.style.pointerEvents = 'none';  
    }
});


cargarDatos();
mostrarDatos(usuarios);

function cargarAlbumesSelect(){
    let albumesSelect = document.getElementById("albumesImagenes");
    albumesSelect.replaceChildren();
    for (let i = 0; i < cantidadAlbumes; i++) {
        let option = document.createElement("option");
        option.setAttribute("value",i+1);
        option.textContent = "Album "+(i+1);
        albumesSelect.appendChild(option);
    }
}

function generarAlbumes(){
    cantidadAlbumes = imagenes[imagenes.length-1].albumId;
    for (let i = 0; i < cantidadAlbumes; i++) {
        let album = document.createElement("div");
        let titulo = document.createElement("h2");
        titulo.textContent = "Albúm "+(i+1);
        album.classList.add("album");
        imagenes.forEach(element => {
            if(element.albumId == (i+1)){
                album.appendChild(element);
            }
        });
        contenedor.appendChild(titulo);
        contenedor.appendChild(album);
        
    }
}

function crearUsuario(){
    let nombre = document.getElementById("nameForm");
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let website = document.getElementById("website");
    
    if(!validacionUsuario(nombre,username,email,phone,website)){
        return;
    }

    let newUser = new User(usuarios.length+1, nombre.value, username.value, email.value, phone.value, website.value);
    usuarios.unshift(newUser);
    mostrarDatos(usuarios);
    contenedorformularioCrearUsuario.querySelector("form").reset();
    contenedorformularioCrearUsuario.querySelectorAll("input").forEach(element => {
        element.style.border = "";
    });
    esconderModal();
}

export function validacionUsuario(nombre,username,email,phone,website){
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
    
    if(!comprobarRegex(phone, /^\d{9}$/)){
        valido = false;
    }
    
    if(!comprobarRegex(website, /^\w+\.\w+$/)){
        valido = false;
    }
    
    return valido;
}

window.addEventListener('beforeunload', () => {
    let formularios = modalBtnSend.querySelectorAll("form");
    formularios.forEach(formulario => {
        formulario.reset();
    });
})

function esconderModal(){
    divModal.classList.add("hiddenModal");
        divModalForm.classList.add("hiddenModal");
        setTimeout(()=>{
            divModal.classList.add("hidden");
            divModalForm.classList.add("hidden");
            divModal.classList.remove("modalDivSend");
            divModalForm.classList.remove("hiddenModal");
            divPublicar.classList.add("hidden");
            contenedorformularioCrearImagen.classList.add("hidden");
            contenedorformularioCrearUsuario.classList.add("hidden");
        },300);
}
function mostrarModal(){
    divModal.classList.remove("hidden");
    divModalForm.classList.remove("hidden");
    divModal.classList.add("modalDivSend");
}

function mostrarDatos(datos){
    contenedor.replaceChildren();
    if (ubicacion == "tareas") {
        let tareasPorUsuario = {};
        let ordenUsuarios = [];

        datos.forEach(tarea => {
            if (!tareasPorUsuario[tarea.userId]) {
                tareasPorUsuario[tarea.userId] = [];
                ordenUsuarios.push(tarea.userId);
            }
            tareasPorUsuario[tarea.userId].push(tarea);
        });

        ordenUsuarios.forEach(userId => {
            let usuario = usuarios.find(user => user.id == userId);
            if(usuario){
                let userDiv = document.createElement("div");
                userDiv.classList.add("user-tasks");
                let userTitle = document.createElement("h2");
                userTitle.textContent = `Tareas de @${usuario.username}`;
                userDiv.appendChild(userTitle);
                contenedor.appendChild(userDiv);
                tareasPorUsuario[userId].forEach(tarea => {
                    userDiv.appendChild(tarea);
                    tarea.shadowRoot.querySelector("#btnEliminarTarea").classList.remove("hidden");
                    tarea.shadowRoot.querySelector("#btnEditarTarea").classList.remove("hidden");
                });
            }
        });
    } else {
        datos.forEach(dato => {
            contenedor.appendChild(dato);
        });
    }
    
}
export function obtenerUsuarioPorId(userId) {
    let usuario = usuarios.find(usuario => usuario.id == userId) || null;
    return usuario;
}

function busqueda(tipo,busqueda,conjunto){
    contenedor.replaceChildren();
    let buscados = conjunto.filter(dato => dato[tipo].includes(busqueda));
    if(busqueda == ""&&conjunto==imagenes){
        generarAlbumes();
    }else{
        if(buscados.length == 0){
            textNotFound.classList.remove("hidden");
        }else{
            textNotFound.classList.add("hidden");
        }

        if(ubicacion == "posts"){
            buscados.forEach(post => {
                contenedor.appendChild(post);
                post.mostrarSecundario();
            });
        }else{
            mostrarDatos(buscados);
        }
        
    }
    
}
function cargarUsuarioSelect(){
    for (const select of mostrarUsuariosSelect) {
        select.replaceChildren();
        usuarios.forEach(usuario => {
            let option=document.createElement("option");
            option.setAttribute("value",usuario.username);
            option.textContent=usuario.username;
            select.add(option);
        });
    }
}

function comprobarRegex(inputElement, regex) {
    if (regex.test(inputElement.value)) {
        inputElement.style.border = "1px solid green"; 
        return true;
    } else {
        inputElement.style.border = "1px solid red";
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
        publicaciones.push(publicacion);
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
        tareas.push(nuevaTarea);
        usuarios.forEach(usuario => {
            if(usuario.id == nuevaTarea.userId){
                usuario.addTarea(nuevaTarea);
            }
        });
    });
    //JSON de fotos a Objetos FOTO
    for (let i = 0; i < 500; i++) {
        let imagen = new Foto(fotos[i].albumId,fotos[i].id,fotos[i].title,fotos[i].url,fotos[i].thumbnailUrl);
        imagenes.push(imagen);
    }
}