"use client";
import styles from "../page.module.css";
import Link from "next/link";

export default function Cadastrar() {
    const cadastrar = async (e) => {
        e.preventDefault(); 
        const data ={
            nome: document.querySelector("#name").value,
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
            confirmPassword: document.querySelector("#confirmPassword").value
        }

        if(!data.nome && !data.email && !data.password && !data.confirmPassword) return

        try {
            const response = await fetch("/api/cadastro",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            
            if(!response.ok){
                const error = await response.json()
                console.log(error)
                return
            }

            console.log("cadastro concluído!");
        } catch (error) {
            console.log(error)
        }

      };

  return (
    <div className={styles.lgn}>
      <section className={styles.bg}></section>
      <section className={styles.form}>
        <h1>Cadastrar</h1>
        <form method="post" onSubmit={cadastrar}>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Insira seu nome..."
              required
            />

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Insira seu email..."
              required
            />

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Insira sua senha..."
              required
            />

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirmar Senha..."
              required
            />
          <button type="submit">Cadastrar</button>
        </form>
        <div>
          <p>
            Já tem uma conta? <Link href="/login">Faça login</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
