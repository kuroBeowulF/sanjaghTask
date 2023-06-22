import { Html, Head, Main, NextScript } from 'next/document'
import { vazirmatn } from './_app'

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head />
      <body className={`${vazirmatn.className} ${vazirmatn.variable}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
