import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { AnalyticsTracker } from "@/lib/analytics/AnalyticsTracker";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BillBee - Expense Management SaaS",
  description: "AI-powered financial expense management and receipt scanning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col font-sans">
          <AnalyticsTracker />
          <Navbar />
          <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
            {children}
          </main>
        </body>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX"} />
      </html>
    </ClerkProvider>
  );
}
