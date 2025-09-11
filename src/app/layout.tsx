import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexus - Personal Dashboard",
  description: "A glance-inspired personal dashboard and blog system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
