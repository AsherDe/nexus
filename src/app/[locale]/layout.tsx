import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "../globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus - Personal Dashboard",
  description: "A glance-inspired personal dashboard and blog system",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={jetbrainsMono.variable}>
        <NextIntlClientProvider messages={messages}>
          <div className="fixed top-4 right-4 z-50 flex gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
