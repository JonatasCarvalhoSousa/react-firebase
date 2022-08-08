import { useState } from "react";

import { auth } from "../../firebaseConnection";
import { signOut } from "firebase/auth";
import "./admin.css";

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");

  function handleRegister(e) {
    e.preventDefault();
    alert("Clicou");
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
          onChange={(e) => setTarefaInput(e.targer.value)}
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
