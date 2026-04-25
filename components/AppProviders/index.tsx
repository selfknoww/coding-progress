"use client";

import { ThemeProvider } from "@hooks/useTheme";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
