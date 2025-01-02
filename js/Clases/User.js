import { contenedorTareas, contenedorPosts, usuarios, publicaciones } from "../main.js";

class User extends HTMLElement {
    constructor(id, name, username, email, phone, website) {
        super();
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.posts = [];
        this.tareas = [];
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            let shadow = this.attachShadow({ mode: "open" });
            let estilo = document.createElement("link");
            estilo.setAttribute("rel", "stylesheet");
            estilo.setAttribute("href", "./css/user.css");

            let plantilla = document.getElementById("user");
            let contenido = plantilla.content;
            let user = contenido.cloneNode(true);

            let btnEliminar = user.querySelector("#btnEliminar");
            let btnPosts = user.querySelector("#btnPost");
            let btnTareas = user.querySelector("#btnTarea");

            user.querySelector("#name").textContent = this.name;
            user.querySelector("#userName").textContent = "@" + this.username;
            btnPosts.textContent = "POSTS 📰";
            btnTareas.textContent = "TAREAS 📋";
            user.querySelector("#info").addEventListener('click', () => {
                this.showTareas();
                this.showPosts();
            });

            shadow.appendChild(estilo);
            shadow.appendChild(user);

            // Crear modal
            const modal = document.createElement("div");
            modal.setAttribute("id", "modalEliminar");
            modal.setAttribute("class", "modal");
            modal.innerHTML = `
                <div class="modal-content">
                    <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                    <button id="confirmarEliminar">Sí</button>
                    <button id="cancelarEliminar">No</button>
                </div>
            `;
            shadow.appendChild(modal);

            // Mostrar modal al hacer clic en eliminar
            btnEliminar.addEventListener('click', () => {
                modal.style.display = "block";
            });

            // Confirmar eliminación
            modal.querySelector("#confirmarEliminar").addEventListener('click', () => {
                this.getPosts().forEach(post => {
                    post.remove();
                    publicaciones.splice(publicaciones.indexOf(post), 1);
                });
                usuarios.splice(usuarios.indexOf(this), 1);
                this.remove();
                contenedorTareas.classList.remove("active");
                contenedorPosts.classList.remove("active");
                modal.style.display = "none";
            });

            // Cancelar eliminación
            modal.querySelector("#cancelarEliminar").addEventListener('click', () => {
                modal.style.display = "none";
            });

            // Mostrar posts y tareas
            btnTareas.addEventListener('click', () => {
                this.showTareas();
            });

            btnPosts.addEventListener('click', () => {
                this.showPosts();
            });

            
        }
    }

    addPost(post) {
        this.posts.unshift(post);
    }

    showTareas(){
        if (this.tareas.length > 0) {
            contenedorTareas.replaceChildren();
            contenedorTareas.classList.remove("active");
            setTimeout(() => {
                let titulo = document.createElement("h1");
                titulo.setAttribute("id", "tareaTitulo");
                titulo.textContent = this.tareas.length+" TAREAS";
                titulo.setAttribute("id", "tareaTitulo");
                contenedorTareas.appendChild(titulo);
                this.tareas.forEach(tarea => {
                    contenedorTareas.appendChild(tarea);
                    tarea.shadowRoot.querySelector("#btnEliminarTarea").classList.add("hidden");
                });
                contenedorTareas.classList.toggle("active");
            }, 200);
        }
    }
    
    showPosts(){
        if (this.posts.length > 0) {
            contenedorPosts.replaceChildren();
            contenedorPosts.classList.remove("active");
            setTimeout(() => {
                let titulo = document.createElement("h1");
                titulo.textContent = this.posts.length+" POSTS";
                titulo.setAttribute("id", "postTitulo");
                contenedorPosts.appendChild(titulo);
                this.posts.forEach(post => {
                    contenedorPosts.appendChild(post);
                    post.mostrarPrincipal();
                });
                contenedorPosts.classList.toggle("active");
            }, 200);
        }
    }

    addTarea(tarea) {
        this.tareas.unshift(tarea);
    }

    getTareas() {
        return this.tareas;
    }

    getPosts() {
        return this.posts;
    }
}
export {
    User
}
