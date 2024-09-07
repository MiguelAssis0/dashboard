"use client"
import styles from "../page.module.css";
import Link from "next/link";

export default function Login() {
    const verifyLogin = () =>{
        
    }

  return (
    <div className={styles.lgn}>
      <section className={styles.bg} ></section>
      <section className={styles.form}>
        <h1>Login</h1>
        <form method="post" action="/api/login">

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu email..."
              required
            />

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha..."
              required
            />

          <button onClick={verifyLogin}>Login</button>
        </form>
        <div>
          <p>
            Ainda não tem uma conta? <Link href="/cadastrar">Cadastrar</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
