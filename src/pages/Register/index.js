import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../Home/home.css";
import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleCadastrar(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/admin", { replace: true });
        })
        .catch(() => {
          console.log("ERRO AO FAZER LOGIN");
        });
    } else {
      alert("Preencha todos os campos");
    }
  }

  return (
    <div className="home-container">
      <h1>Cadastre-se!</h1>
      <span>Crie aqui sua conta</span>
      <form className="form" onSubmit={handleCadastrar}>
        <input
          type="texrt"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          autoComplete={false}
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Cadastrar</button>
      </form>
      <Link className="button-link" to="/">
        {" "}
        Já possui uma conta ? Entre!
      </Link>
    </div>
  );
}
