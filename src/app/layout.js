import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import RazorpayScript from './components/RazorpayScript'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Template Marketplace',
  description: 'Premium website templates for your next project',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <RazorpayScript />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}