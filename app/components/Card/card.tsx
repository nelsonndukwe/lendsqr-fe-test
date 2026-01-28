"use client";

import Image from "next/image";
import styles from "./card.module.scss";
interface CardProps {
    icon: string;
    label: string;
    count: number;
}

const Card = ({ icon, label, count }: CardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.icon}>
                <Image src={icon} alt="icon" width={40} height={40} />
            </div>
            <p className={styles.label}>{label}</p>
            <p className={styles.count}>{count.toLocaleString()}</p>
        </div>
    );
};

export default Card;
