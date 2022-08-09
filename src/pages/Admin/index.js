import { useEffect, useState } from "react";

import { auth, db } from "../../firebaseConnection";
import { signOut } from "firebase/auth";
import "./admin.css";
import { addDoc, collection } from "firebase/firestore";

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser");
      setUser(JSON.parse(userDetail));
    }
    loadTarefas();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    if (tarefaInput === "") {
      alert("Insira alguama tardefa!");
    }

    await addDoc(collection(db, "tarefas"), {
      tarefas: tarefaInput,
      created: new Date(),
      uid: user?.uid,
    })
      .then(() => {
        setTarefaInput();
      })
      .catch((error) => {
        alert("Houve um erro:" + error + "tente novamente!");
      });
  }

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="admin-container">
      <h1>Minhas tarefas</h1>

      <form className="form" onSubmit={handleRegister}>
        <textarea
          placeholder="Digite sua tarefa..."
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />

        <button className="btn-register" type="submit">
          Registrar tarefa{" "}
        </button>
      </form>

      <article className="list">
        <p>jhskadsjfs dfv bj dsfk mgfn gnd</p>
        <div>
          <button>Editar</button>
          <button className="btn-delete"></button>
        </div>
      </article>

      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}
