"use client";
import Image from "next/image";
import styles from "./navbar.module.scss";
import { icons, images } from "@/lib/assets";
import { GoChevronDown } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { Dropdown } from "../Dropdown/dropdown";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "@/types";
import Link from "next/link";


const Navbar = () => {
    const [selected, setSelected] = useState("10")
    const router = useRouter()
    const [user] = useLocalStorage<User | undefined>("user", undefined);

    return (
        <div className={styles.parentWrapper}>
            <div className={styles.logoWrapper}>
                <Link href={`/dashboard/${user?.id}/users`} className={styles.logo}>
                    <Image
                        src={icons.miniLogo}
                        alt="logo"
                        width={144.8}
                        height={30}
                        loading="eager"
                    />
                </Link>

                <div className={styles.searchBar}>
                    <input type="text" placeholder="Search for anything" />
                    <button>
                        <CiSearch color="#FFFFFF" size={16} />
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



                <Dropdown
                    options={[
                        { value: "view-user", label: user?.fullName as string, iconElement: GoChevronDown, },
                        { value: "blacklist-user", label: user?.status as string, iconElement: GoChevronDown, },

                    ]}
                    value={selected}
                    onChange={setSelected}
                    trigger={<div className={styles.profileInfo}>
                        <Image
                            src={images.avatar}
                            alt="profile-pic"
                            width={40}
                            height={40}
                            loading="eager"
                        />

                        <div>
                            <p>{user?.username}</p>
                            <GoChevronDown />
                        </div>
                    </div>}

                    renderOption={(Option) => (
                        <div onClick={() => {
                            if (Option.href) router.push(Option.href)

                            return
                        }} className={styles.render}>
                            <span>{Option.label}</span>
                        </div>
                    )}
                />


            </div>
        </div>
    );
};

export default Navbar;
