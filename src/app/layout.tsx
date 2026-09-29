import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/app/providers/StoreProvider";

export const metadata: Metadata = {
  title: "ShopHub",
  description: "ShopHub application",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang='en'>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
