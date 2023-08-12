import './globals.css'
import { Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={syne.className + " flex w-screen h-screen justify-center item-center bg-gray-500"}>
        <div className='flex flex-col w-full h-screen max-w-lg bg-gray-200'>
          <h1 className='flex items-center justify-center py-6 text-3xl font-bold bg-white'>FRIENDLY</h1>
          {children}
        </div>
      </body>
    </html>
  )
}
