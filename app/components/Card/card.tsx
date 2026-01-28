"use client";

import Image from "next/image";
import styles from "./card.module.scss";


interface Props {
    icon: string;
    Label: string;
    count: number;
}

const Card = (props: Props) => {
    return (
        <div className={styles.card}>
            <div className={styles.icon}>
                <Image src={props.icon} alt="icon" width={40} height={40} />{" "}
            </div>
            <p>{props.Label}</p>
            <p className="">{props.count}</p>
        </div>
    );
};

export default Card;
