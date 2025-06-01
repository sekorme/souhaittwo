import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontJost } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";
import ToasterProvider from "@/providers/ToastProvider";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import BottomNavbar from "@/components/BottomNavbar";
import { ToastProvider } from "@heroui/toast";
import LayoutTrans from "@/components/LayoutTrans";
import AosProviders from "@/providers/AosProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL("https://souhaittraveladvisors.com"),
  icons: {
    icon: "/logo2.PNG",
    shortcut: "logo2.PNG",
    apple: "/appstore.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://souhaittraveladvisors.com",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/appstore.png",
        width: 1200,
        height: 630,
        alt: "Souhait Travel Advisors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@souhaittravel",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "black", // Always black regardless of theme
};

export default async function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode;
}) {
  const isUserAuthenticated = await isAuthenticated();

  return (
      <html suppressHydrationWarning lang="en">
      <head>
        <meta name="theme-color" content="white" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
          className={clsx(
              "min-h-screen bg-background font-jost antialiased",
              fontJost.variable
          )}
      >
      <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
        <AosProviders>
          <ToasterProvider />
          <ToastProvider placement="top-center" />
          <div className="relative flex flex-col">
            {!isUserAuthenticated && <Navbar />}

            <main className="w-full flex-grow">
              <LayoutTrans>{children}</LayoutTrans>
            </main>

            {!isUserAuthenticated ? (
                <footer className="w-full">
                  <Footer />
                </footer>
            ) : (
                <BottomNavbar />
            )}
          </div>
        </AosProviders>
      </Providers>
      </body>
      </html>
  );
}
