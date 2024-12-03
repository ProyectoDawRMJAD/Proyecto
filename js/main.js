import { Comentario } from "./Clases/Comentario.js";
import { Foto } from "./Clases/Foto.js";
import { Post } from "./Clases/Post.js";
import { Tarea } from "./Clases/Tarea.js";
import { User } from "./Clases/User.js";
import {fotos} from "/json/photos.js";
import {posts} from "/json/posts.js";
import {todos} from "/json/todos.js";
import {users} from "/json/users.js";
import {comments} from "/json/comments.js";
console.log(fotos);
console.log(posts);
console.log(todos);
console.log(users);
console.log(comments);

customElements.define("template-user",User);
customElements.define("template-comentario",Comentario);
customElements.define("template-post",Post);
customElements.define("template-todo",Tarea);
customElements.define("template-foto",Foto);

