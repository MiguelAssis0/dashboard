import Header from "./Header";
import Link from "next/link";
import styles from "../page.module.css";
import Footer from "./Footer";


export default function Inicio() {
    return (
        <>
            <Header /> 
            <div className={styles.home}>
                <h1>Organize seus projetos freelancer de maneira profissional</h1>
                <Link href="/cadastrar">Começar</Link>
            </div>
            <Footer />
        </>
    )
}