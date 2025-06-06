import Link from "next/link"
import { Button } from "../ui/button"

const Navbar = () => {
  return (
    <nav className="py-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
            <Link href="/">
                <h1 className="text-3xl font-semibold">Blog<span className="text-blue-500">MMTQ</span></h1>
            </Link>
            <div className="hidden sm:flex items-center gap-6">
                <Link href="/" className="text-sm font-medium hover:text-blue-500 transition-colors">Home</Link>
                <Link href="/dashboard" className="text-sm font-medium hover:text-blue-500 transition-colors">Dashboard</Link>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <Button>Sign In</Button>
            <Button variant="outline">Sign Up</Button>
        </div>
    </nav>
  )
}

export default Navbar
