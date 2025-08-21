import Navbar from './Navbar'
import { Outlet } from 'react-router'
import Footer from './Footer'

const PublicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default PublicLayout