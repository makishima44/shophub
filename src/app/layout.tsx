import type { Metadata } from "next";
import { StoreProvider } from "@/app/providers/StoreProvider";
import { Header } from "@/widgets/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: "ShopHub",
  description: "ShopHub application",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang='en'>
      <body>
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
