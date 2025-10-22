import "./globals.css";
import { Nunito } from "next/font/google";
import { generatePageSEO } from "@/lib/seo";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata = generatePageSEO('home');

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body
        className={`${nunito.variable} antialiased font-nunito`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
