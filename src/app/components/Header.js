import Link from "next/link";
import styles from "../page.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div>
                <h1>Dashboard</h1>
            </div>
            <nav>
                <ul>
                    <li><Link href="/cadastrar">Cadastrar</Link></li>
                    <li className={styles.login}><Link href="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    );
}