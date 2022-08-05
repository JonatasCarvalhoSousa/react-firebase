import { db, auth } from "./firebaseConnection";
import { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import "./app.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { async } from "@firebase/util";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [idPost, setIdPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleAdd() {
    // await setDoc(doc(db, "posts", "12345"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    //   .then(() => {
    //     console.log("Deu bom");
    //     setAutor("");
    //     setTitulo("");
    //   })
    //   .catch((error) => {
    //     console.log("deu ruim" + error);
    //   });

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("deu bom de novo");
        setAutor("");
        setTitulo("");
      })
      .catch((error) => {
        console.log("deu ruim" + error);
      });
  }

  useEffect(() => {
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPosts = [];

        snapshot.forEach((doc) => {
          listaPosts.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });
        setPosts(listaPosts);
      });
    }
    loadPosts();
  }, []);

  async function handleBuscar() {
    //const postRef = doc(db, "posts", "12345");
    //await getDoc(postRef)
    //  .then((snapshot) => {
    //    setAutor(snapshot.data().autor);
    //    setTitulo(snapshot.data().titulo);
    //  })
    //  .catch((error) => {
    //    console.log("deu ruim");
    //  });
    const postRef = collection(db, "posts");
    await getDocs(postRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });
        setPosts(lista);
      })
      .catch((error) => {
        console.log("deu ruim" + error);
      });
  }

  async function handleEditar() {
    const docRef = doc(db, "posts", idPost);

    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        setIdPost("");
        setTitulo("");
        setAutor("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleExcluir(id) {
    const docRef = doc(db, "posts", id);

    await deleteDoc(docRef).then(() => {
      alert("Deletado com sucesso!");
    });
  }

  async function novoUsuario() {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        setEmail("");
        setSenha("");
        alert("Cadastrado com sucesso");
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/weak-password") {
          alert("Senha muito fraca");
        } else if (error.code === "auth/email-already-in-use") {
          alert("Email já existe");
        }
      });
  }

  return (
    <div>
      <h1>React Js + firebase </h1>
      <div className="container">
        <h2>Usuarios</h2>
        <label>Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite um email"
        />
        <br></br>
        <label>Senha:</label>
        <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite uma senha"
        />
        <br></br>
        <button onClick={novoUsuario}>Cadastrar</button>
      </div>
      <br></br>
      <hr></hr>

      <div className="container">
        <h2>POSTS</h2>
        <label>Id Post: </label> <br></br>
        <textarea
          type="text"
          placeholder="Digite o titulo"
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        />{" "}
        <br></br>
        <label>Titulo: </label> <br></br>
        <textarea
          type="text"
          placeholder="Digite o titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />{" "}
        <br></br>
        <label>Autor: </label> <br></br>
        <textarea
          type="text"
          placeholder="Digite o autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />{" "}
        <br></br>
        <button onClick={handleAdd}>Cadastrar</button> <br></br>
        <button onClick={handleBuscar}>Buscar Doc</button>
        <br></br>
        <button onClick={handleEditar}>Atualizar</button> <br></br>
      </div>

      <ul>
        {posts.map((item) => {
          return (
            <li key={item.id}>
              <strong>Id Post: {item.id}</strong> <br></br>
              <span>Titulo: {item.titulo}</span> <br></br>
              <span>Autor: {item.autor}</span>
              <br></br>
              <button onClick={() => handleExcluir(item.id)}>Excluir</button>
              <br></br>
              <br></br>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
