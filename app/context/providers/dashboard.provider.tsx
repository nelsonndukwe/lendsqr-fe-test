
"use client";

import { useDashboardState } from "@/hooks/use-dashboard";
import { DashboardContext } from "../dashboard.context";

export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const dashboard = useDashboardState();

    return (
        <DashboardContext.Provider value={dashboard}>
            {children}
        </DashboardContext.Provider>
    );
}
