"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Dashboard from "./components/Dashboard";
import Inicio from "./components/Inicio";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className={styles.page}>
      {isLogin ? (
        <Dashboard />
      ) : (
        <Inicio />
      )}
    </div>
  );
}
