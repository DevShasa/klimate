import  type {PropsWithChildren } from 'react'
import Header from './header'

const Layout = ({children}:PropsWithChildren) => {
  return (
    <div className='bg-gradient-to-br from-background to-muted'>
        <Header />
        <main className='min-h-screen container mx-auto px-4 py-4'>
            {children}
        </main>
        <footer className='border-t backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='container mx-auto px-4 text-center text-gray-500 py-4'>
                <p>Wolan ❤️ one love</p>
            </div>
        </footer>
    </div>
  )
}

export default Layout