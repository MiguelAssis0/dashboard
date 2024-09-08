"use client";
import { useEffect, useState } from "react";
import styles from "../page.module.css";
import Link from "next/link";
import { useStore } from "../statesControll";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { setLogin, setUser } = useStore((state) => ({
    setLogin: state.setLogin,
    setUser: state.setUser,
  }));
  
  const { Login } = useStore((state) => ({
    Login: state.Login,
  }))
  
  useEffect(() => {
    if (Login) {
      window.location.href = "/";
    }
  }, [Login]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos os campos são obrigatórios!");
      return;
    }

    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao fazer login.");
        return;
      }

      setSuccess("Cadastrado com sucesso!");

      setEmail("");
      setPassword("");

      const data = await response.json();
      setLogin(true);
      setUser(data);

    } catch (error) {
      console.error("Erro na requisição:", error);
      setError("Erro ao enviar a requisição.");
    }
  };

  return (
    <div className={styles.lgn}>
      <section className={styles.bg}></section>
      <section className={styles.form}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Digite sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className={styles.message} style={{ color: "red" }}>{error}</p>}
        {success && <p className={styles.message} style={{ color: "green" }}>{success}</p>}
        <div>
          <p>
            Ainda não tem uma conta? <Link href="/cadastrar">Cadastrar</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
