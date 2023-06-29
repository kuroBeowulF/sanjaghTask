import "./globals.css";
import localFont from "next/font/local";
import Navbar from "../components/Navbar";

export const vazirmatn = localFont({
  src: [
    {
      path: "../public/fonts/Vazirmatn-FD-NL-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
});

export const metadata = {
  title: "سنجاق",
  description: "Created by Kuro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.className} ${vazirmatn.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
