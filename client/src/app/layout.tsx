import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "../redux/store";
import ProtectedPage from "../routes/protected-routes";
import { AuthProvider } from "../routes/auth-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SupMart",
  description: "Belanja di SupMart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <AuthProvider>
              <ProtectedPage>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
              </ProtectedPage>
            </AuthProvider>
          </AppRouterCacheProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
