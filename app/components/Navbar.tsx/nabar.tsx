"use client";
import Image from "next/image";
import styles from "./navbar.module.scss";
import { icons, images } from "@/lib/assets";
import { GoChevronDown } from "react-icons/go";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
    return (
        <div className={styles.parentWrapper}>
            <div className={styles.logoWrapper}>
                <div className={styles.logo}>
                    <Image
                        src={icons.miniLogo}
                        alt="logo"
                        width={144.8}
                        height={30}
                        loading="eager"
                    />
                </div>

                <div className={styles.searchBar}>
                    <input type="text" placeholder="Search for anything" />
                    <button>
                        <CiSearch color="#FFFFFF" size={16}  />
                    </button>
                </div>
            </div>

            <div className={styles.profile}>
                <div className={styles.bellIcon}>
                    <p>Docs</p>

                    <Image
                        src={icons.bell}
                        alt="bell"
                        width={26}
                        height={26}
                        loading="eager"
                    />
                </div>

                <div className={styles.profileInfo}>
                    <Image
                        src={images.avatar}
                        alt="profile-pic"
                        width={40}
                        height={40}
                        loading="eager"
                    />

                    <div>
                        <p>Adedeji</p>
                        <GoChevronDown />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
