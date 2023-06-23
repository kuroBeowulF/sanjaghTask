import { Html, Head, Main, NextScript } from "next/document";
import { vazirmatn } from "./_app";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "سنجاق",
  description: "Created by Kuro",
};
export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head />
      <body className={`${vazirmatn.className} ${vazirmatn.variable}`}>
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
