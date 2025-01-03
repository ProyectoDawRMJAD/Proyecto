import { contenedorTareas, contenedorPosts, usuarios, publicaciones, validacionUsuario } from "../main.js";

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
            let btnEditar = user.querySelector("#btnEditar");
            let btnInfo = user.querySelector("#btnInfo");

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

            let modalEliminar = document.createElement("div");
            modalEliminar.setAttribute("id", "modalEliminar");
            modalEliminar.setAttribute("class", "modal");
            modalEliminar.innerHTML = `
                <div class="modal-content">
                    <p>Estás seguro de que deseas eliminar este usuario?</p>
                    <button id="confirmarEliminar">Sí</button>
                    <button id="cancelarEliminar">No</button>
                </div>
            `;
            shadow.appendChild(modalEliminar);

            btnEliminar.addEventListener('click', () => {
                modalEliminar.style.display = "block";
            });

            modalEliminar.querySelector("#confirmarEliminar").addEventListener('click', () => {
                this.getPosts().forEach(post => {
                    post.remove();
                    publicaciones.splice(publicaciones.indexOf(post), 1);
                });
                usuarios.splice(usuarios.indexOf(this), 1);
                this.remove();
                contenedorTareas.classList.remove("active");
                contenedorPosts.classList.remove("active");
                modalEliminar.style.display = "none";
            });

            modalEliminar.querySelector("#cancelarEliminar").addEventListener('click', () => {
                modalEliminar.style.display = "none";
            });

            let modalEditar = document.createElement("div");
            modalEditar.setAttribute("id", "modalEditar");
            modalEditar.setAttribute("class", "modal");
            modalEditar.innerHTML = `
                <div class="modal-content">
                    <h2>Editar Usuario</h2>
                    <label for="editName">Nombre</label>
                    <input type="text" id="editName" value="${this.name}" />
                    <label for="editUsername">Usuario</label>
                    <input type="text" id="editUsername" value="${this.username}" />
                    <label for="editEmail">Correo</label>
                    <input type="email" id="editEmail" value="${this.email}" />
                    <label for="editPhone">Teléfono</label>
                    <input type="text" id="editPhone" value="${this.phone}" />
                    <label for="editWebsite">Sitio Web</label>
                    <input type="text" id="editWebsite" value="${this.website}" />
                    <button id="guardarCambios">Guardar</button>
                    <button id="cancelarEdicion">Cancelar</button>
                </div>
            `;
            shadow.appendChild(modalEditar);
            let modalConfirmacion = document.createElement("div");
            modalConfirmacion.classList.add("modal");
            modalConfirmacion.innerHTML = `
                <div class="modal-content">
                    <h1>Confirmación</h2>
                    <h2>✅ Los cambios se han guardado correctamente.</h3>
                </div>
            `;

            shadow.appendChild(modalConfirmacion);
            btnEditar.addEventListener('click', () => {
                modalEditar.style.display = "block";
            });

            // Guardar cambios de edición
            modalEditar.querySelector("#guardarCambios").addEventListener('click', () => {
                let newName = modalEditar.querySelector("#editName");
                let newUsername = modalEditar.querySelector("#editUsername");
                let newEmail = modalEditar.querySelector("#editEmail");
                let newPhone = modalEditar.querySelector("#editPhone");
                let newWebsite = modalEditar.querySelector("#editWebsite");

                if(!validacionUsuario(newName, newUsername, newEmail, newPhone, newWebsite)) {
                    return;
                }

                this.name = newName.value;
                this.username = newUsername.value;
                this.email = newEmail.value;
                this.phone = newPhone.value;
                this.website = newWebsite.value;
                modalEditar.querySelectorAll("input").forEach(input => input.style.border = "");
    
                this.shadowRoot.querySelector("#name").textContent = this.name;
                this.shadowRoot.querySelector("#userName").textContent = "@" + this.username;

                publicaciones.forEach(post => {
                    if (post.userId == this.id) {
                        post.shadowRoot.querySelector("#autorPostSecundario").textContent = "@" + this.username;
                    }
                });

                modalEditar.style.display = "none";
                modalConfirmacion.style.display = "block";

                setTimeout(() => {
                    modalConfirmacion.style.display = "none";
                }, 900);
            });

            let modalInfo = document.createElement("div");
            modalInfo.classList.add("modal");
            modalInfo.innerHTML = `
                <div class="modal-content">
                    <h2>Información del Usuario</h2>
                    <p><strong>Nombre</strong> ${this.name}</p>
                    <p><strong>Usuario</strong> @${this.username}</p>
                    <p><strong>Correo</strong> ${this.email}</p>
                    <p><strong>Teléfono</strong> ${this.phone}</p>
                    <p><strong>Sitio Web</strong> ${this.website}</p>
                    <button id="cerrarInfo" class="btn">Cerrar</button>
                </div>
            `;
            shadow.appendChild(modalInfo);

            modalEditar.querySelector("#cancelarEdicion").addEventListener('click', () => {
                modalEditar.style.display = "none";

            });


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

    showTareas() {
        if (this.tareas.length > 0) {
            contenedorTareas.replaceChildren();
            contenedorTareas.classList.remove("active");
            setTimeout(() => {
                let titulo = document.createElement("h1");
                titulo.setAttribute("id", "tareaTitulo");
                titulo.textContent = this.tareas.length + " TAREAS";
                contenedorTareas.appendChild(titulo);
                this.tareas.forEach(tarea => {
                    contenedorTareas.appendChild(tarea);
                    tarea.shadowRoot.querySelector("#btnEliminarTarea").classList.add("hidden");
                    tarea.shadowRoot.querySelector("#btnEditarTarea").classList.add("hidden");
                });
                contenedorTareas.classList.toggle("active");
            }, 200);
        }
    }

    showPosts() {
        if (this.posts.length > 0) {
            contenedorPosts.replaceChildren();
            contenedorPosts.classList.remove("active");
            setTimeout(() => {
                let titulo = document.createElement("h1");
                titulo.textContent = this.posts.length + " POSTS";
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
        this.tareas.push(tarea);
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
};