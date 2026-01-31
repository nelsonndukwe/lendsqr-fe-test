import { createContext } from "react";

export const DashboardContext = createContext<{
    toggleSidebar: () => void;
    toggleMobileSidebar: () => void;
    closeMobileSidebar: () => void;
    isMobile?: boolean | undefined;
    open?: boolean | undefined;
    openMobile?: boolean | undefined;
} | null>(null);



