"use client";

import { useCurrentUserStore } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const router = useRouter();
  useEffect(() => {
    if (!currentUser) {
      router.push("/sign-in");
    }
  }, [currentUser, router]);

  return <>{children}</>;
}
