import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import AppProviders from "@components/AppProviders";

export const metadata: Metadata = {
  title: "LC Coding",
  description: "LeetCode 0x3f study plans with local progress tracking.",
  icons: "/favico.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        <AppProviders>
          <div className="app-shell bg-body text-body">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
