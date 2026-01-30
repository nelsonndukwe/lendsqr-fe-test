import Image from "next/image";
import styles from "./tabs.module.scss"
import { icons } from "@/lib/assets";
import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "@/types";
import { FaRegStar } from "react-icons/fa6";

import { FaStar } from "react-icons/fa6";
import { random } from "@/helpers";

type Tab = {
    id: string;
    label: string;
};

type CustomerTabsProps = {
    user:User | undefined;
    tabs: Tab[];
    activeTab: string;
    onChange: (id: string) => void;
};

export function CustomerTabs({
    user,
    tabs,
    activeTab,
    onChange
}: CustomerTabsProps) {

    return (

        <div className={styles.customerTabsWrapper}>


            <div className={styles.userProfile}>
                <div className="">
                    <Image src={icons.profile} alt="profile" width={100} height={100} />
                </div>

                <div className="">
                    <p className={styles.title}>{user?.fullName}</p>
                    <p className={styles.subtitle}>{user?.personalInformation.bvn}</p>
                </div>

                <hr></hr>

                <div className={styles.tier}>
                    <p className={styles.title}>User’s Tier</p>
                    <p className={styles.subtitle}>

                        {Array.from({ length: random }).map((_, index) => (
                            <FaStar key={`filled-${index}`} color="#E9B200" />
                        ))}

                        {Array.from({ length: 5 - random }).map((_, index) => (
                            <FaRegStar key={`outline-${index}`} color="#E9B200" />
                        ))}                    </p>
                </div>

                <hr></hr>
                <div className="">
                    <p className={styles.title}>200,000.00</p>
                    <p className={styles.subtitle}>9912345678/Providus Bank</p>
                </div>
            </div>

            <div className={styles.customerTabs}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
                        onClick={() => onChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>


    );
}
