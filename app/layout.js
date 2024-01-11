import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'
import './globals.css'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Santri',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <main className='relative overflow-hidden'>
        {children}
        </main>
        </body>
    </html>
  )
}
