import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";
import ToasterProvider from "@/providers/ToastProvider";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import BottomNavbar from "@/components/BottomNavbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isUserAuthenticated = await isAuthenticated();

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <ToasterProvider />
          <div className="relative flex flex-col ">
            {!isUserAuthenticated && <Navbar />}

            <main className="w-full flex-grow">{children}</main>
            {!isUserAuthenticated ? (
              <footer className="w-full  ">
                <Footer />
              </footer>
            ) : (<BottomNavbar/>)}
          </div>
        </Providers>
      </body>
    </html>
  );
}
