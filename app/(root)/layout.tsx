"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SetupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [user] = useLocalStorage<User | null>("user", null);

    useEffect(() => {
        if (user) {
            router.push(`/dashboard/${user.id}/users`);
        }
    }, [user, router]);

    return <>{children}</>;
}
