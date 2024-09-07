"use client";
import styles from "./page.module.css";
import Dashboard from "./components/Dashboard";
import Inicio from "./components/Inicio";
import { useStore } from "./statesControll";

export default function Home() {
  const isLoggedIn = useStore((state) => state.Login);

  return (
    <div className={styles.page}>
      {!isLoggedIn ? (
        <Inicio />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}
