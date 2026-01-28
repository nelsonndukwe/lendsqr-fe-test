import { userMetrics } from "@/lib/data";
import styles from "../../scss/page.module.scss";
import Card from "@/app/components/Card/card";
const usersPage = () => {
    return (
        <div style={{ height: "100vh" }}>
            <div className="">
                <p className={styles.header}>Users</p>
            </div>

            <div className={styles.cardWrapper}>
                {userMetrics.map((metric) => (
                    <Card
                        key={metric.label}
                        icon={metric.icon}
                        label={metric.label}
                        count={metric.count}
                    />
                ))}
            </div>
        </div>
    );
};

export default usersPage;
