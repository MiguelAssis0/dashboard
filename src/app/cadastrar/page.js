"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import Link from "next/link";
import { useStore } from "../statesControll";

export default function Cadastrar() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const { setLogin, setUser } = useStore((state) => ({
    setLogin: state.setLogin,
    setUser: state.setUser,
  }));

  const { Login } = useStore((state) => ({
    Login: state.Login,
  }))

  useEffect(() => {
    if (Login) {
      router.push("/");
    }
  }, [Login]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
  };

  const cadastrar = async (e) => {
    e.preventDefault();

    const { nome, email, password, confirmPassword } = form;

    if (!nome || !email || !password || !confirmPassword) {
      setError("Todos os campos são obrigatórios!");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    setError(null);

    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, password, confirmPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao cadastrar usuário.");
        return;
      }

      setSuccess("Cadastrado com sucesso!");
      setForm({ nome: "", email: "", password: "", confirmPassword: "" });

      const data = await response.json();
      setLogin(true);
      setUser(data);

      
    } catch (error) {
      setError("Erro ao enviar a requisição.");
    }

  };

  return (
    <div className={styles.lgn}>
      <section className={styles.bg}></section>
      <section className={styles.form}>
        <h1>Cadastrar</h1>
        <form onSubmit={cadastrar}>
          <input
            type="text"
            id="nome"
            placeholder="Insira seu nome..."
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Insira seu email..."
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Insira sua senha..."
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirmar Senha..."
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
        {error && <p className={styles.message} style={{ color: "red" }}>{error}</p>}
        {success && <p className={styles.message} style={{ color: "green" }}>{success}</p>}
        <div>
          <p>
            Já tem uma conta? <Link href="/login">Faça login</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
