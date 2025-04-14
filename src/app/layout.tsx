import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import ThemeTogglebutton from "@/components/ui/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const font = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VCode Converter - AI Code Converter",
  description: "Convert your code to more than 35 languages with AI in a go!",
  metadataBase: new URL("https://vcodeconverter.vercel.app"),
  icons: {
    icon: "/fav.png",
    apple: "/fav.png",
  },
  openGraph: {
    title: "VCode Converter - AI Code Converter",
    description: "Convert your code to over 35 languages using AI, instantly.",
    url: "https://vcodeconverter.vercel.app",
    siteName: "VCode Converter",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "VCode Converter Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VCode Converter - AI Code Converter",
    description: "Convert your code to 35+ languages with AI, instantly.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className, "overflow-x-hidden")}>
        <ThemeProviderWrapper>
          <nav className="sticky top-0 backdrop-blur-md border-b bg-background/20 rounded-b-xl z-50 flex items-center justify-between py-2 w-full px-6 md:px-10 shadow-md">
            <h1 className="text-lg font-semibold md:text-2xl cursor-crosshair">
              <span className="text-primary">VCode</span>Converter.
              <span className="text-primary">_</span>
            </h1>
            <ThemeTogglebutton />
          </nav>
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
