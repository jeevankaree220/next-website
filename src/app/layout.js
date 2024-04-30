import { Inter, Roboto, Poppins, Montserrat, Raleway, Fira_Code, DM_Sans, Patrick_Hand } from "next/font/google";
import "./globals.css";
import Head from 'next/head';
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], display: 'swap' });
const roboto = Roboto({ subsets: ["latin"], variable: '--font-roboto', weight:['400', '500'], display: 'swap' });
const poppins = Poppins({ subsets: ["latin"], variable: '--font-poppins', weight:['400', '500', '600', '700', '800'], display: 'swap' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat', weight:['400', '500', '600', '700', '800'], display: 'swap' });

export const metadata = {
  title: "Next.js Website ",
  description: "Create fast loading website using Next.js",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <Head>
        <Link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />

      </Head>
      <script async src="https://tally.so/widgets/embed.js"></script>


      <body className={`${montserrat.variable} ${poppins.variable} ${roboto.variable} font-montserrat`}>{children}</body>
    </html>
  );
}
