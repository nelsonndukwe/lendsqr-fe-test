import styles from "./home.module.scss";
import Signup from "@/app/components/Signup/Sign-up";



export default function HomePage() {
    return (
        <div className={styles.home}>
            <Signup />
        </div>
    );
}
