import type { Metadata } from "next";
import "./globals.scss";
import { icons } from "@/lib/assets";


export const metadata: Metadata = {
    title: "Lendsqr-fe-test",
    description: "Manage lending",
    icons: {
        icon: icons.favicon,
        apple: icons.favicon,
        shortcut: icons.favicon,
    },
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
