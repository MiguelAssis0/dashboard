import Header from "./Header";
import styles from "../page.module.css";
import { useStore } from "../statesControll";

export default function Dashboard() {

    const logout = () =>{
        useStore.getState().setLogin(false)
        useStore.getState().setUser({})

        window.location.reload()
    }

    return (
        <div className={styles.page}>
            <h1>Ola</h1>

            <button onClick={logout}>Logout</button>
        </div>
    );
}