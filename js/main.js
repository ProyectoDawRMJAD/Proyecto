import { Comentario } from "./Clases/Comentario.js";
import { Foto } from "./Clases/Foto.js";
import { Post } from "./Clases/Post.js";
import { Tarea } from "./Clases/Tarea.js";
import { User } from "./Clases/User.js";

customElements.define("template-foto", Foto);

let jsons = ["json/comments.json", "json/photos.json", "json/posts.json", "json/todos.json", "json/users.json"];

let users = [], tareas = [], posts = [], comentarios = [], fotos = [];

cargarDatos();
// Función para cargar todos los JSONs y procesarlos según su tipo
function cargarDatos() {
    jsons.forEach(json => {
        fetch(json)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar el JSON: ${json}`);
                }
                return response.json();
            })
            .then(data => {
                switch (json) {
                    case "json/comments.json":
                        cargarComentarios(data);
                        break;
                    case "json/photos.json":
                        cargarFotos(data);
                        break;
                    case "json/posts.json":
                        cargarPosts(data);
                        break;
                    case "json/todos.json":
                        cargarTareas(data);
                        break;
                    case "json/users.json":
                        cargarUsuarios(data);
                        break;
                    default:
                        console.warn(`No hay un handler definido para el archivo: ${json}`);
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    });
}

// Funciones de procesamiento para cada tipo de JSON

function cargarComentarios(data) {
    data.forEach(item => {
        let comentario = new Comentario(item.postID, item.id, item.name, item.email, item.body);
        comentarios.push(comentario);
    });
}

function cargarFotos(data) {
    data.forEach(item => {
        let foto = new Foto(item.albumId, item.id, item.title, item.url, item.thumbnailUrl);
        fotos.push(foto);
    });
    mostrarFotos();  
}

function cargarPosts(data) {
    data.forEach(item => {
        let post = new Post(item.userId, item.id, item.title, item.body);
        posts.push(post);
    });
}

function cargarTareas(data) {
    data.forEach(item => {
        let tarea = new Tarea(item.userId, item.id, item.title, item.completed);
        tareas.push(tarea);
    });
}

function cargarUsuarios(data) {
    data.forEach(item => {
        let usuario = new User(
            item.id,
            item.name,
            item.username,
            item.email,
            item.address.street,
            item.address.suite,
            item.address.city,
            item.address.zipcode,
            item.address.geo.lat,
            item.address.geo.lng,
            item.phone,
            item.website,
            item.company.name,
            item.company.catchPhrase,
            item.company.bs
        );
        users.push(usuario);
    });
}

function mostrarFotos() {
    let contenedor = document.getElementById("prueba");
    for (let i = 2; i < 10; i++) {
        contenedor.append(fotos[i]);
    }
}


