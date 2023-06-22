import '@/styles/globals.css'
import localFont from 'next/font/local';

export const vazirmatn = localFont({
  src: [
    {
      path: '../public/fonts/Vazirmatn-FD-NL-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-vazirmatn',
});

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
