"use client";

import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

type DashboardState = {
    isMobile: boolean;
    open: boolean;
    openMobile: boolean;
};

export const useDashboardState = () => {
    const [state, setState] = useLocalStorage<DashboardState>(
        "dashboard-state",
        {
            isMobile: false,
            open: false,
            openMobile: false,
        }
    );

    // Detect screen size safely
    useEffect(() => {
        const handleResize = () => {
            window.addEventListener("resize", () => {
                const isMobile = window.innerWidth <= 768;
                setState((prev) => ({
                    ...prev,
                    isMobile,
                }));
            });
        };

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [setState]);

    useEffect(() => {
        const checkScreen = () => {
            const isMobile = window.innerWidth <= 768;
            setState((prev) => ({
                ...prev,
                isMobile,
            }));
        };
        checkScreen();
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    /* ===== Sidebar controls ===== */

    const toggleSidebar = () => {
        setState((prev) => ({
            ...prev,
            open: !prev.open,
        }));
    };

    const toggleMobileSidebar = () => {
        setState((prev) => ({
            ...prev,
            openMobile: !prev.openMobile,
        }));
    };

    const closeMobileSidebar = () => {
        setState((prev) => ({
            ...prev,
            openMobile: false,
        }));
    };

    return {
        ...state,
        toggleSidebar,
        toggleMobileSidebar,
        closeMobileSidebar,
    };
};
