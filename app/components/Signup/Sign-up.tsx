"use client";
import Image from "next/image";
import styles from "./sign-up.module.scss";
import { icons, images } from "@/lib/assets";
import { useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "@/types";
import { getUsers } from "@/app/actions/sign-in";
import { useRouter } from "next/navigation";

const Signup = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [_, setUser] = useLocalStorage<User | null>("user", null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setResponse("");

        try {
            const users: User[] = await getUsers();

            console.log(users);

            const matchedUser = users.find(
                (user) => user.email === email && user.password === password
            );

            if (!matchedUser) {
                setResponse("Invalid email or password");
                return;
            }

            setUser(matchedUser);
            setEmail("");
            setPassword("");
            setResponse("Login successful");
            router.push(`/dashboard/${matchedUser.id}/users`);
            console.log("Login successful:", matchedUser);
        } catch (error) {
            console.error("Login error:", error);
            setResponse("An error occurred during login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.parentWrapper}>
            <div className={styles.imageWrapper}>
                <div className={styles.bannerWrapper}>
                    <Image
                        src={icons.logo}
                        alt="logo"
                        width="173"
                        height="36"
                        className={styles.logo}
                        loading="eager"
                    />

                    <Image
                        src={images.banner}
                        alt="sign in banner"
                        width="600"
                        height="337"
                        className={styles.banner}
                        loading="eager"
                    />
                </div>
            </div>

            <div className={styles.formWrapper}>
                <div className={styles.logoWrapper}>
                    <Image
                        src={icons.logo}
                        alt="logo"
                        width="173"
                        height="36"
                        className={styles.logo}
                        loading="eager"
                    />
                </div>
                <div className={styles.formSecondaryWrapper}>
                    <div className={styles.header}>
                        <h1>Welcome</h1>
                        <p>Enter details to login.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-required
                        />
                        <div className={styles.passwordWrapper}>
                            <input
                                type={isVisible ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-required
                            />

                            <span
                                onClick={toggleVisibility}
                                className={styles.togglePassword}
                            >
                                {isVisible ? "HIDE" : "SHOW"}{" "}
                            </span>
                        </div>
                        <div className={styles.forgotPassword}>
                            <p className="">Forgot PASSWORD?</p>
                        </div>

                        {response && <span>{response}</span>}

                        <button disabled={loading} type="submit">
                            {loading ? "Loading..." : " Log in"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
