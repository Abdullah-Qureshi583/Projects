import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "FortiLock - Keep Your Passwords Secure",
  description:
    "This is the password manager that save your password to your own local storage",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script src="https://cdn.lordicon.com/lordicon.js" />
      </body>
    </html>
  );
}
